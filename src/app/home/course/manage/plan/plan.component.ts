import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatDialog } from '@angular/material';
import { ManageService } from '../manage.service';
import { PlanAddComponent } from './dialog/plan-add/plan-add.component';
import { PlanService } from './plan.service';
import { take, tap } from 'rxjs/operators';
import { TeachPlanNode } from '../models/TeachplanNode';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
// interface TeachplanNode {
//   pname: string;
//   children?: TeachplanNode [];
// }


@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  treeControl = new NestedTreeControl<TeachPlanNode >(node => node.children);
  dataSource = new MatTreeNestedDataSource<TeachPlanNode >();
  courseName: string;

  constructor(private service: PlanService,
              private managerService: ManageService,
              private dialog: MatDialog) {

  }

  hasChild = (_: number, node: TeachPlanNode ) => !!node.children && node.children.length > 0;

  ngOnInit() {
    // this.service.find('4028e581617f945f01617f9dabc40000').subscribe(res => {
    //   if (res.data) {
    //     this.dataSource.data = res.data.children;
    //     this.courseName = res.data.pname;
    //   }
    // });
    // this.service.find('4028e581617f945f01617f9dabc40000');

    // this.service.dataChange.subscribe(data => {
    //   this.dataSource.data = data.children;
    //   this.courseName = data.pname;
    // });

    this.managerService.dataStore.subscribe(res => {
      if (res && res.teachplanNode && res.teachplanNode.children) {
        this.dataSource.data = res.teachplanNode.children;
        this.courseName = res.teachplanNode.pname;
      }
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(PlanAddComponent, {
      data: {courseid: this.managerService.courseId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
      }
    });
  }

}
