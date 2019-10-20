import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { PagesService } from '../../../pages.service';
import { PageService } from '../../page.service';

@Component({
  selector: 'app-page-link',
  templateUrl: './page-link.component.html',
  styleUrls: ['./page-link.component.scss']
})
export class LinkComponent implements OnInit {
  formControl = new FormControl('', [
    Validators.required
  ]);

  // 站点列表
  siteList = [];

  // 模板列表
  templateList = [];

  dataUrlList = [];

  serverList = [];

  constructor(public dialogRef: MatDialogRef<LinkComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public pagesServices: PagesService,
              public pageService: PageService) { }

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

    this.pagesServices.getServerList().subscribe((res: any) => {
      if (res.data && res.data.list) {
        this.serverList = res.data.list;
      }
    });
  }

  onSave() {
    this.pageService.link(this.data);
  }

  onModelChange($event) {
    this.data.webPath = this.serverList.find((item) => {
      return item.serverId === $event;
    }).webPath;
  }

}
