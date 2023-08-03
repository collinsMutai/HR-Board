import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IJobs } from '../../Interface/Ijobs';
import { JobsService } from '../../Service/jobs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  status: boolean = false;
  list: any;
  selected: any;
  filterText: string = '';
  filterTitle: string = '';
  jobs: IJobs[] = [];
  profile!: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobsService: JobsService
  ) {
    this.list = ['Full Stack', 'Frontend', 'React', 'Java'];
  }

  ngOnInit(): void {
    this.jobs = this.jobsService.Jobs;
  }
  select(item: any) {
    this.selected = item;
    console.log(this.selected);
    this.filterTitle = item;
    const inputId = document.getElementById('inputId') as HTMLInputElement;
    console.log(inputId.value);
    inputId.value = '';
    this.filterText = '';
  }
  isActive(item: any) {
    return this.selected === item;
  }
  clearFilter() {
    this.filterTitle = '';
  }
  getId(id: number) {
    this.router.navigate([`/jobs/${id}`], {
      relativeTo: this.route,
    });
  }
}
