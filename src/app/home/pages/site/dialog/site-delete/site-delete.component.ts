import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SiteModel } from '../../site.model';
import { SiteService } from '../../site.service';

@Component({
  selector: 'app-site-delete',
  templateUrl: './site-delete.component.html',
  styleUrls: ['./site-delete.component.scss']
})
export class SiteDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: SiteModel,
              private siteService: SiteService) { }

  ngOnInit() {
  }

  onConfirm() {
    this.siteService.delete(this.data);
  }

}
