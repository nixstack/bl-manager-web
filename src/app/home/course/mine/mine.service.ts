import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MineService {
  private baseApi = '/course';
  public coursesBS: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient) {
  }

  findAll() {
    this.http.get(`${this.baseApi}`).subscribe((res: any) => {
      if (res.data && res.data.list) {
        this.coursesBS.next(res.data);
      }
    });
  }
}
