import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { PlanService } from '../../plan.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { TeachPlanModel } from '../../../models/TeachPlanModel';
import { ManageService } from '../../../manage.service';

@Component({
  selector: 'app-plan-add',
  templateUrl: './plan-add.component.html',
  styleUrls: ['./plan-add.component.scss']
})
export class PlanAddComponent implements OnInit {
  // 上级结点列表
  teachPlanList = [
  ];


  constructor(@Inject(MAT_DIALOG_DATA) public data: TeachPlanModel,
              private service: PlanService,
              private managerService: ManageService,
              public dialogRef: MatDialogRef<PlanAddComponent>) { }

  ngOnInit() {
    // console.log(this.service.data);
    this.managerService.dataStore.subscribe((res => {
      this.teachPlanList = res.teachplanNode.children || [];
    }));


  }


  onSave() {
    this.service.add(this.data);
  }

}
