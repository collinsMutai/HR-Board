import { Injectable } from '@angular/core';
import { IJobs } from '../Interface/Ijobs';

import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IUser } from '../Interface/IUser';

import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Data } from './Jobs';

const mongodbUrl = environment.apiUrl + '/user/';
// const mongodbUrl = 'http://localhost:3002/api/user/';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  // baseUrl: string = 'http://localhost:3000';
  // mongodbUrl: string = 'http://localhost:3002/api/user';

  private isAuthenticated = false;
  private userId!: string;
  private token!: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  returnUrl!: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  Jobs: IJobs[] = Data;
  getToken() {
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getJobs() {
    return this.Jobs;
  }

  getJob(id: number) {
    return this.Jobs[id];
  }

  createUser(email: string, password: string) {
    const userData: IUser = { email: email, password: password };
    this.http.post(mongodbUrl + 'register', userData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        this.authStatusListener.next(false);
      }
    );
  }

  login(email: string, password: string) {
  
    
    const userData: IUser = { email: email, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        mongodbUrl + 'login',
        userData
      )
      .subscribe(
        (response) => {
          console.log(response);

          const token = response.token;
          this.token = token;

          if (token) {
            const expiresInDuration = response.expiresIn;
            console.log(expiresInDuration);
            this.setAuthTimer(expiresInDuration);

            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId);
            // this.router.navigate(['/'])
             this.returnUrl =
              this.route.snapshot.queryParams['returnUrl'] ||
              `/apply/${this.userId}`;
            this.router.navigateByUrl(this.returnUrl);
          }
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }


  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  log_out() {
    localStorage.clear();
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = '';
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.log_out();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    if (!token || !expirationDate) {
      return '';
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }
}
