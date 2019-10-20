import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CategoryItemNode } from './category/category.model';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  dataStore = new BehaviorSubject<CategoryItemNode[]>([]);

  constructor(private http: HttpClient) { }

  get data() {
    return this.dataStore.value;
  }

  // 查询分类
  findCategory() {
    this.http.get('/category').subscribe((res: any) => {
      if (res.data && res.data.length) {
        this.dataStore.next(res.data);
      }
    });
  }

  addCategory(param) {
    this.http.post('/category', param).subscribe((res: any) => {
      if (res.data) {
        this.dataStore.next(this.data);
      }
    });
  }
}
