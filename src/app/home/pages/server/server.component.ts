import { Component, OnInit } from '@angular/core';
import { ServerService } from './server.service';
import { ServerModel } from './server.model';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { ServerAddComponent } from './dialog/server-add/server-add.component';
import { ServerDeleteComponent } from './dialog/server-delete/server-delete.component';
import { ServerEditComponent } from './dialog/server-edit/server-edit.component';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  private dataSource = new MatTableDataSource<ServerModel>();
  displayedColumns: string[] = [
    'serverName',
    'ip',
    'port',
    'webPath',
    'actions'
  ];

  constructor(private dialog: MatDialog,
              private service: ServerService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.dataStore.subscribe((res: any) => {
      this.dataSource.data = res.list;
    });
  }

  onAdd() {
    this.dialog.open(ServerAddComponent, {
      data: {}
    });
  }

  onDelete(idx, row) {
    this.dialog.open(ServerDeleteComponent, {
      data: {label: row.serverName, id: row.serverId, index: idx}
    });
  }

  onEdit(i, row) {
    const rowCopy = Object.assign({}, row);
    this.dialog.open(ServerEditComponent, {
      data: {...rowCopy, index: i}
    });
  }
}
