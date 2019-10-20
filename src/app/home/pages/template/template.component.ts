import { Component, OnInit } from '@angular/core';
import { TemplateModel } from './tempate.model';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { TemplateService } from './template.service';
import { TemplateAddComponent } from './dialog/template-add/template-add.component';
import { TemplateDeleteComponent } from './dialog/template-delete/template-delete.component';
import { TemplateEditComponent } from './dialog/template-edit/template-edit.component';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  private dataSource = new MatTableDataSource<TemplateModel>();
  displayedColumns: string[] = [
    'siteName',
    'templateName',
    'templateParameter',
    'actions'
  ];
  private siteList: [];

  constructor(private dialog: MatDialog,
              private service: TemplateService,
              private pagesService: PagesService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.pagesService.getSiteList().subscribe((res: any) => {
      if (res.data && res.data.list) {
        this.siteList = res.data.list;
      }
    });

    this.service.dataStore.subscribe((res: any) => {
      this.dataSource.data = res.list;
    });
  }

  onAdd() {
    this.dialog.open(TemplateAddComponent, {
      data: {}
    });
  }

  onDelete(idx, row) {
    this.dialog.open(TemplateDeleteComponent, {
      data: {label: row.templateName, id: row.templateId, index: idx}
    });
  }

  onEdit(i, row) {
    const rowCopy = Object.assign({}, row);
    this.dialog.open(TemplateEditComponent, {
      data: {...rowCopy, index: i}
    });
  }

}
