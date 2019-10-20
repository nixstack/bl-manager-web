import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  private baseApi = '/cms';

  constructor(private http: HttpClient) { }

  // 站点列表
  getSiteList() {
    return this.http.get(`${this.baseApi}/site`);
  }

  // 模板列表
  getTemplateList() {
    return this.http.get(`${this.baseApi}/template`);
  }

  // 数据模型列表
  getModeList() {
    return this.http.get(`${this.baseApi}/config/model`);
  }

  // 服务列表
  getServerList() {
    return this.http.get(`${this.baseApi}/server`);
  }
}
