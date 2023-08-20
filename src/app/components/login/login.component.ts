import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { JobsService } from '../../Service/jobs.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  private authStatusSub!: Subscription;

  constructor(public JobsService: JobsService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });

    this.authStatusSub = this.JobsService.getAuthStatusListener().subscribe(
      (authStatus) => {
        
      }
    );
  }

  onLogin() {
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }
    this.JobsService.login(this.form.value.email, this.form.value.password);
  }

  ngOnDestroy(): void {
    if (this.authStatusSub) {
      this.authStatusSub.unsubscribe();
    }
  }
}
