import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/core/api-response';
import { BehaviorSubject } from 'rxjs';
import { CourseView } from './models/CourseView';
import { ActivatedRoute } from '@angular/router';
import { CourseBase } from './models/CourseBase';

// @Injectable()
// 子组件中能注入该service实例
@Injectable({
  providedIn: 'root'
})
export class ManageService {

  private baseApi = '/course';
  courseId = '';
  filesystemDomain = 'http://192.168.235.103';
  dataStore = new BehaviorSubject<CourseView>(new CourseView());

  constructor(private http: HttpClient,
              private routeInfo: ActivatedRoute) {}

  get data(): CourseView {
    return this.dataStore.value;
  }

  // 保存基本信息
  saveBasic(data: CourseBase): any {
    this.http.post(`${this.baseApi}/basic`, data).subscribe((res: any) => {
      if (res.data) {
        const courseView = this.data;
        courseView.courseBase = res.data;
        this.dataStore.next(courseView);
      }
    });
  }

  // 查询课程信息
  findCourseView(courseId) {
    // console.log(this.routeInfo);
    this.courseId = courseId;
    return this.http.get(`${this.baseApi}/view/${this.courseId}`).subscribe((res: any) => {
      if (res.flag === 0) {
        this.dataStore.next(res.data);
      }
    });
  }

  // 查询课程分类
  findCourseCategory() {
    return this.http.get('/category');
  }

  saveCoursePic(courseid: string, fileId: string) {
    return this.http.post(`${this.baseApi}/pic`, {courseid: this.courseId, pic: fileId});
  }

  delCoursePic(courseId: string) {
    return this.http.delete(`${this.baseApi}/pic/${this.courseId}`);
  }

}
