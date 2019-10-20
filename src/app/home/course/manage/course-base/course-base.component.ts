import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CourseBase } from '../models/CourseBase';
import { ManageService } from '../manage.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material';
import { Router } from '@angular/router';

interface CategoryNode {
  name: string;
  children ?: CategoryNode[];
}

@Component({
  selector: 'app-course-base',
  templateUrl: './course-base.component.html',
  styleUrls: ['./course-base.component.scss']
})
export class CourseBaseComponent implements OnInit {
  data = new CourseBase();
  treeControl = new NestedTreeControl<CategoryNode>(node => node.children);
  categoryDataSource = new MatTreeNestedDataSource<CategoryNode>();

  constructor(private manageService: ManageService,
              private changeDetectorRed: ChangeDetectorRef,
              private router: Router) { }

  ngOnInit() {
    this.loadData();
  }
  loadData(): any {
    this.manageService.dataStore.subscribe(res => {
      if (res && res.courseBase) {
        this.data = res.courseBase;
        Object.assign(this.data, res.courseBase);
        // 监测不到变化
        // this.data = res.courseBase;
        // this.changeDetectorRed.markForCheck();
        // this.changeDetectorRed.detectChanges();
      }
    });

    this.manageService.findCourseCategory().subscribe((res: any) => {
      if (res.data) {
        this.categoryDataSource.data = res.data;
      }
    });
  }

  onSave() {
    this.manageService.saveBasic(this.data);
    this.manageService.dataStore.subscribe((res: any) => {
      // this.router.navigate(['/home/course/manage'], {queryParams: {id: this.data.id}});
      if (res.courseBase && res.courseBase.id) {
        this.data = res.courseBase;
        this.router.navigateByUrl(`/home/course/manage/${this.data.id}`);
      }
    });
  }

  // hasChild = (_: number, node: CategoryNode) => !!node.children && node.children.length > 0;

  hasChild = (_: number, node: CategoryNode) => {
    return !!node.children && node.children.length > 0;
  }
  itemSelectionToggle(node) {
    this.data.st = node.id;
  }

}
