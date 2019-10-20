import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-server-edit',
  templateUrl: './server-edit.component.html',
  styleUrls: ['./server-edit.component.scss']
})
export class ServerEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialog,
              private serverService: ServerService) { }

  ngOnInit() {
  }

  onConfirm() {
      this.serverService.edit(this.data);
  }

}
