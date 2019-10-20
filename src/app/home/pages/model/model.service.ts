import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModelModelNode } from './model.model';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/core/api-response';

interface IModelModelSource {
  list: ModelModelNode[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private baseApi = '/cms/config/model';
  dataStore = new BehaviorSubject<IModelModelSource>({} as any);
  // 临时存储dialog数据
  dialogData: any;

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

  add(param) {
    this.dialogData = param;
    this.http.post<ApiResponse>(this.baseApi, param).subscribe(res => {
      //
    });
  }

  delete(param) {
    this.http.delete<ApiResponse>(`${this.baseApi}/${param.id}`).subscribe(res => {
      this.data.list.splice(param.index, 1);
      this.data.total--;
      this.dataStore.next(this.data);
    });
  }

  edit(param) {
    this.http.put<ApiResponse>(`${this.baseApi}/${param.id}`, param).subscribe(res => {
      this.data.list.splice(param.index, 1, param);
      this.dataStore.next(this.data);
    });
  }
}
