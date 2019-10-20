import { Component, OnInit, Inject } from '@angular/core';
import { TemplateModel } from '../../tempate.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TemplateService } from '../../template.service';
import { PagesService } from '../../../pages.service';

@Component({
  selector: 'app-template-add',
  templateUrl: './template-add.component.html',
  styleUrls: ['./template-add.component.scss']
})
export class TemplateAddComponent implements OnInit {
  private file: File;

  constructor(@Inject(MAT_DIALOG_DATA) public data: TemplateModel,
              private templateService: TemplateService,
              private pagesService: PagesService) { }

  ngOnInit() {
    this.pagesService.getSiteList().subscribe((res: any) => {
      if (res.data && res.data.list) {
        this.data.siteList = res.data.list;
      }
    });
  }

  onConfirm() {
    this.templateService.add(this.data, this.file);
  }

  onUpload($event) {
    this.file = $event.event.target.files[0];
  }

  onAfterUpload($event) {
  }

}
