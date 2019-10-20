import { Component, OnInit } from '@angular/core';
import { SiteService } from './site.service';
import { SiteModel } from './site.model';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { SiteAddComponent } from './dialog/site-add/site-add.component';
import { SiteDeleteComponent } from './dialog/site-delete/site-delete.component';
import { SiteEditComponent } from './dialog/site-edit/site-edit.component';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  private dataSource = new MatTableDataSource<SiteModel>();
  displayedColumns: string[] = [
    'siteName',
    'siteDomain',
    'sitePort',
    'siteWebPath',
    'sitePhysicalPath',
    'actions'
  ];

  constructor(private dialog: MatDialog,
              private service: SiteService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.dataStore.subscribe((res: any) => {
      this.dataSource.data = res.list;
    });
  }

  onAdd() {
    this.dialog.open(SiteAddComponent, {
      data: {}
    });
  }

  onDelete(idx, row) {
    this.dialog.open(SiteDeleteComponent, {
      data: {label: row.siteName, id: row.siteId, index: idx}
    });
  }

  onEdit(i, row) {
    const rowCopy = Object.assign({}, row);
    this.dialog.open(SiteEditComponent, {
      data: {...rowCopy, index: i}
    });
  }
}
