import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PeriodicElement } from '../../page.component';
import { PageService } from '../../page.service';
import { FormControl, Validators } from '@angular/forms';
import { PagesService } from '../../../pages.service';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})
export class PageEditComponent implements OnInit {
  formControl = new FormControl('', [
    Validators.required
  ]);

  // 站点列表
  siteList = [];

  // 模板列表
  templateList = [];

  dataUrlList = [];

  constructor(public dialogRef: MatDialogRef<PageEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
              public service: PageService,
              public pagesServices: PagesService) { }

  ngOnInit() {
    this.pagesServices.getSiteList().subscribe((res: any) => {
      if (res.data && res.data.list) {
        this.siteList = res.data.list;
      }
    });
    this.pagesServices.getTemplateList().subscribe((res: any) => {
      if (res.data && res.data.list) {
        this.templateList = res.data.list;
      }
    });

    this.pagesServices.getModeList().subscribe((res: any) => {
      if (res.data && res.data.list) {
        this.dataUrlList = res.data.list;
      }
    });
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? '必填字段' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    this.service.update(this.data);
  }

}
