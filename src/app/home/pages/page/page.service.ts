import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from 'src/app/core/api-response';
import { stringify } from 'querystring';
import { PeriodicElement } from './page.component';
import { BehaviorSubject } from 'rxjs';
import { ToasterService } from 'src/app/share/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private path = '/cms/page';

  // private dataStore;

  // 临时存储dialog数据
  dialogData: any;

  dataChange: BehaviorSubject<PeriodicElement[]> = new BehaviorSubject<PeriodicElement[]>([]);

  get data() {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  constructor(private http: HttpClient,
              private toasterService: ToasterService) { }

  select(active?: any, direction?: any, pageIndex?: any) {
    console.log(active, direction, pageIndex);
    const url = `${this.path}/1/10`;
    return this.http.get(url);
  }

  find(pageIndex: any = 1, pageSize: any = 10, query?: any) {
    const queryString = stringify(query);
    return this.http.get<ApiResponse>(`${this.path}/${pageIndex}/${pageSize}?${queryString}`);
    // return this.http.get<ApiResponse>(`${this.path}/1/10`, { observe: 'response'});
  }

  add(param) {
    this.dialogData = param;
    return this.http.post<ApiResponse>(`${this.path}`, param).subscribe(res => {
      if (res.flag === 0) {
        this.toasterService.showToaster('新增页面成功');
      } else {
        this.toasterService.showToaster(res.message, 'error');
      }
    },
    (err: HttpErrorResponse) => {
      this.toasterService.showToaster('错误信息: ' + err.name + ' ' + err.message);
    });
  }

  update(param) {
    this.dialogData = param;
    // 405 (Method Not Allowed)
    // return this.http.put<ApiResponse>(`${this.path}`, param).subscribe(res => {
    //   if (res.flag === 0) {
    //     this.toasterService.showToaster('修改页面成功');
    //   }
    // });
    return this.http.put<ApiResponse>(`${this.path}/${param.pageId}`, param).subscribe(res => {
      if (res.flag === 0) {
        this.toasterService.showToaster('修改页面成功');
      }
    });
  }

  delete(pageId: any): any {
    this.http.delete<ApiResponse>(`${this.path}/${pageId}`).subscribe(res => {
      if (res.flag === 0) {
        this.toasterService.showToaster('删除页面成功');
      }
    });
  }

  publish(pageId: any): any {
    this.http.post<ApiResponse>(`${this.path}/publish/${pageId}`, {}).subscribe(res => {
      if (res.flag === 0) {
        this.toasterService.showToaster('发布页面成功');
      } else {
        this.toasterService.showToaster(res.message, 'error');
      }
    },
    (err: HttpErrorResponse) => {
      this.toasterService.showToaster('错误信息: ' + err.name + ' ' + err.message);
    });
  }

  link(data: any): any {
    this.http.put(`${this.path}/link`, data).subscribe((res) => {
      console.log(res);
    });
  }
}
