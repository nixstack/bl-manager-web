import { Component, OnInit } from '@angular/core';
import { MineService } from './mine.service';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.component.html',
  styleUrls: ['./mine.component.scss']
})
export class MineComponent implements OnInit {
  courses: any;
  total: any;
  versions = {};

  constructor(private service: MineService) { }

  ngOnInit() {
    this.service.findAll();

    this.service.coursesBS.subscribe((data: any) => {
      this.courses = data.list;
      this.total = data.total;
    });
  }

}
