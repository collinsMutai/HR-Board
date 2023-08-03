import { Component, OnInit } from '@angular/core';
import { JobsService } from './Service/jobs.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

constructor(private JobService: JobsService){}

  ngOnInit(): void {
    this.JobService.autoAuthUser()
  }
}
