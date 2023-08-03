import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { JobsService } from '../../Service/jobs.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub!: Subscription;
  constructor(public JobsService: JobsService) {}

  ngOnInit(): void {
    this.authStatusSub = this.JobsService.getAuthStatusListener().subscribe(
      (authStatus) => {
        console.log('is logged in: ' + authStatus);
        // this.isLoading = false;
      }
    );
  }

  onLogin(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }

    this.JobsService.login(form.value.email, form.value.password);
  }
  ngOnDestroy(): void {
    if (this.authStatusSub) {
      this.authStatusSub.unsubscribe();
    }
  }
}
