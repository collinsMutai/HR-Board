import { Component, OnInit } from '@angular/core';
import { JobsService } from '../Service/jobs.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css'],
})
export class ApplyComponent implements OnInit {
  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;
  form!: FormGroup;
  id!: any;
  Job!: any;

  constructor(private jobService: JobsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.authListenerSubs = this.jobService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        console.log(isAuthenticated);
        this.userIsAuthenticated = isAuthenticated;
      });
    
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),

      message: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });

    this.id = localStorage.getItem('param');

    this.Job = this.jobService.getJob(this.id);
    console.log(this.Job);
  }

  onSubmit() {
    this.jobService.apply(this.form.value).subscribe((result) => {});
  }
}
