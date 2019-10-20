import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseBase } from '../models/CourseBase';
import { ManageService } from '../manage.service';
import { ToasterService } from 'src/app/share/toaster.service';

@Component({
  selector: 'app-course-publish',
  templateUrl: './course-publish.component.html',
  styleUrls: ['./course-publish.component.scss']
})
export class CoursePublishComponent implements OnInit {
  previewUrl: string;
  data = new CourseBase();
  courseId: string;

  constructor(private http: HttpClient, private managerService: ManageService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.courseId = this.managerService.courseId;
    this.managerService.dataStore.subscribe(res => {
      if (res.courseBase) {
        this.data = res.courseBase;
      }
    });
  }

  onGetPreviewUrl() {
    this.http.post(`/api/course/preview/${this.courseId}`, null).subscribe((res: any) => {
      this.previewUrl = res.data.previewUrl;
    });
  }

  onPublish() {
    this.http.post(`/api/course/publish/${this.courseId}`, null).subscribe((res: any) => {
      console.log(res);
    });
  }

}
