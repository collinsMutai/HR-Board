import { Component, OnDestroy, OnInit } from '@angular/core';

import { JobsService } from './Service/jobs.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;
  returnUrl!: string;
  update = false;
  constructor(private router: Router, private JobsService: JobsService) {}

  ngOnInit(): void {
    this.JobsService.autoAuthUser();
    this.userIsAuthenticated = this.JobsService.getIsAuth();

    this.authListenerSubs = this.JobsService.getAuthStatusListener().subscribe(
      (isAuthenticated) => {
        console.log(isAuthenticated);
        this.userIsAuthenticated = isAuthenticated;
      }
    );
  }

  onLogout(): void {
    this.JobsService.log_out();
    this.router.navigate(['/']);
  }
  ngOnDestroy(): void {
    if (this.authListenerSubs) {
      this.authListenerSubs.unsubscribe();
    }
  }
}
