import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ServerModel } from '../../server.model';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-server-delete',
  templateUrl: './server-delete.component.html',
  styleUrls: ['./server-delete.component.scss']
})
export class ServerDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ServerModel,
              private serverService: ServerService) { }

  ngOnInit() {
  }

  onConfirm() {
    this.serverService.delete(this.data);
  }

}
