import { Component, OnInit } from '@angular/core';
import { JobsService } from '../Service/jobs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css'],
})
export class ApplyComponent implements OnInit {
  id!: any;
  Job!: any;
  constructor(private jobService: JobsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('param')
 
    
    // this.route.params.subscribe((param) => {
    //   this.id = param['id']
    //   console.log(this.id);
    this.Job = this.jobService.getJob(this.id);
    console.log(this.Job);
    
      
    // })
  }
}
