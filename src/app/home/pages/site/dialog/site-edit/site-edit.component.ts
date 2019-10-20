import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SiteService } from '../../site.service';

@Component({
  selector: 'app-site-edit',
  templateUrl: './site-edit.component.html',
  styleUrls: ['./site-edit.component.scss']
})
export class SiteEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MatDialog,
              private siteService: SiteService) { }

  ngOnInit() {
  }

  onConfirm() {
      this.siteService.edit(this.data);
  }

}
