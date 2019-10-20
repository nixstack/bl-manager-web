import { Component, OnInit, Inject } from '@angular/core';
import { TemplateModel } from '../../tempate.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TemplateService } from '../../template.service';
import { PagesService } from '../../../pages.service';

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.scss']
})
export class TemplateEditComponent implements OnInit {
  private file: File;

  constructor(@Inject(MAT_DIALOG_DATA) public data: TemplateModel,
              private service: TemplateService,
              private pagesService: PagesService) { }

  ngOnInit() {
    this.pagesService.getSiteList().subscribe((res: any) => {
      if (res.data && res.data.list) {
        this.data.siteList = res.data.list;
      }
    });
  }

  onConfirm() {
    this.service.edit(this.data, this.file);
  }

  onUpload($event) {
    this.file = $event.event.target.files[0];
  }

}
