import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/core/api-response';
import { TeachPlanNode } from '../models/TeachplanNode';

declare var toastr: any;

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private path = '/course/teachplan';

  // private dataStore;

  // 临时存储dialog数据
  dialogData: any;

  dataChange: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  get data(): TeachPlanNode {
    return this.dataChange.value;
  }

  find(courseId: string) {
    this.http.get<ApiResponse>(`${this.path}/${courseId}`).subscribe(res => {
      this.dataChange.next(res.data);
    });
  }

  add(param) {
    this.dialogData = param;
    return this.http.post<ApiResponse>(`${this.path}`, param).subscribe(res => {
      if (res.flag === 0) {
        toastr.success('添加课程计划成功');
      }
    });
  }
}
