import { Component, OnInit, Inject } from '@angular/core';
import { ServerModel } from '../../server.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-server-add',
  templateUrl: './server-add.component.html',
  styleUrls: ['./server-add.component.scss']
})
export class ServerAddComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ServerModel,
              private serverService: ServerService) { }

  ngOnInit() {
  }

  onSave() {
    this.serverService.add(this.data);
  }

}
