import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TemplateModel } from './tempate.model';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/core/api-response';
import { isObject } from 'util';

interface IDataSource {
  list: TemplateModel[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  baseApi = '/cms/template';
  baseSiteApi = '/cms/site';
  dataStore = new BehaviorSubject<IDataSource>({} as any);
  // 临时存储dialog数据
  dialogData: any;
  siteList;

  constructor(private http: HttpClient) {
    this.findAll();
  }

  get data() {
    return this.dataStore.value;
  }

  findAll() {
    this.http.get<ApiResponse>(`${this.baseApi}`).subscribe(res => {
      if (res.flag === 0) {
        this.dataStore.next(res.data);
      }
    });
  }

  add(param, file) {
    const formData = new FormData();
    delete param.siteList;
    Object.keys(param).forEach((item) => {
      if (isObject(param[item])) {
        formData.append(item , JSON.stringify(param[item]));
      } else {
        formData.append(item , param[item]);
      }
    });
    formData.append('multipartFile', file);
    this.dialogData = param;
    this.http.post<ApiResponse>(this.baseApi, formData).subscribe(res => {
      if (res.flag === 0) {
        this.data.list.push(res.data);
        this.data.total++;
        this.dataStore.next(this.data);
      }
    });
  }

  delete(param) {
    this.http.delete<ApiResponse>(`${this.baseApi}/${param.id}`).subscribe(res => {
      this.data.list.splice(param.index, 1);
      this.data.total--;
      this.dataStore.next(this.data);
    });
  }

  edit(param, file) {
    const formData = new FormData();
    delete param.siteList;
    Object.keys(param).forEach((item) => {
      if (isObject(param[item])) {
        formData.append(item , JSON.stringify(param[item]));
      } else {
        formData.append(item , param[item]);
      }
    });
    formData.append('multipartFile', file);
    this.http.put<ApiResponse>(`${this.baseApi}/${param.templateId}`, formData).subscribe(res => {
      this.data.list.splice(param.index, 1, param);
      this.dataStore.next(this.data);
    });
  }
}
