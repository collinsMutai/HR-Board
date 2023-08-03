import { Component, OnDestroy, OnInit } from '@angular/core';

import { JobsService } from '../../Service/jobs.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;
  returnUrl!: string;

  constructor(private router: Router, private JobsService: JobsService) {}

  ngOnInit(): void {
    // this.JobsService.autoAuthUser()
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
