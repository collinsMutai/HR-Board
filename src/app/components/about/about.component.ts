import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IJobs } from '../../Interface/Ijobs';
import { JobsService } from '../../Service/jobs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  isAuthenticated = false;
  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;
  id!: number;
  job!: any;
  param!: any;
  returnUrl;

  constructor(
    private route: ActivatedRoute,
    private JobService: JobsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.JobService.getIsAuth();
    this.param = this.route.params.subscribe((param) => {
      localStorage.setItem('param', param['id']);
      this.id = param['id'];
      console.log(this.id + 'is id');

      this.job = this.JobService.getJob(this.id);
      console.log(this.job);
    });
  }

  onLogin(id: string) {
    this.isAuthenticated = this.JobService.getIsAuth();
    console.log(this.isAuthenticated);
    console.log(id);
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      this.returnUrl =
        this.route.snapshot.queryParams['returnUrl'] || `/apply/${this.id}`;
      this.router.navigateByUrl(this.returnUrl);
    }
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || `/apply/${this.id}`;
    this.router.navigateByUrl(this.returnUrl);
  }
}
