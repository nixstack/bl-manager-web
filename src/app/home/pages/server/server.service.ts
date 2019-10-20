import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ServerModel } from './server.model';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'src/app/core/api-response';

interface IserverModelSource {
  list: ServerModel[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private baseApi = '/cms/server';
  dataStore = new BehaviorSubject<IserverModelSource>({} as any);
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

  edit(param) {
    this.http.put<ApiResponse>(`${this.baseApi}/${param.serverId}`, param).subscribe(res => {
      this.data.list.splice(param.index, 1, param);
      this.dataStore.next(this.data);
    });
  }
}
