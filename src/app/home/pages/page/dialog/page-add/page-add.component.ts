import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { PeriodicElement } from '../../page.component';
import { FormControl, Validators } from '@angular/forms';
import { PageService } from '../../page.service';
import { PagesService } from '../../../pages.service';

@Component({
  selector: 'app-page-add',
  templateUrl: './page-add.component.html',
  styleUrls: ['./page-add.component.scss']
})
export class PageAddComponent implements OnInit {
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  snackBarConfig = new MatSnackBarConfig();

  // 站点列表
  siteList = [];

  // 模板列表
  templateList = [];

  dataUrlList = [];

  constructor(public dialogRef: MatDialogRef<PageAddComponent>,
              public snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
              public service: PageService,
              public pagesServices: PagesService) {
                this.snackBarConfig.duration = 3000;
              }

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
    this.service.add(this.data);
  }

}
