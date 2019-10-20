import { Component, OnInit } from '@angular/core';
import { ManageService } from './manage.service';
import { ActivatedRoute } from '@angular/router';
import { CourseView } from './models/CourseView';

export enum Stepper {
  ADD = -1,
  BAS = 0,
  PIC = 4,
  PLA = 8,
  PUB = 12,
}


@Component({
  selector: 'app-mine',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  Stepper = Stepper;
  stepper = Stepper.BAS;

  constructor(private routeInfo: ActivatedRoute,
              private service: ManageService) { }

  ngOnInit() {
    this.loadData();
  }

  isDisable(st) {
    let flag = true;
    if (this.stepper === Stepper.ADD) {
      if (st === Stepper.BAS) {
        flag = false;
      }
    } else {
      flag = false;
    }

    return flag;
  }

  loadData() {
    const courseId = this.routeInfo.snapshot.params.id;
    if (!courseId || courseId === 'add') {
      this.stepper = Stepper.ADD;
      this.service.dataStore.next(new CourseView());
    } else {
      this.service.findCourseView(courseId);
      this.stepper = Stepper.BAS;
    }

    // this.service.dataStore.subscribe(res => {
    //   console.log(res);
    // });

  }

}
