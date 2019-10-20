import { Component, OnInit, Inject } from '@angular/core';
import { SiteModel } from '../../site.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SiteService } from '../../site.service';

@Component({
  selector: 'app-site-add',
  templateUrl: './site-add.component.html',
  styleUrls: ['./site-add.component.scss']
})
export class SiteAddComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: SiteModel,
              private siteService: SiteService) { }

  ngOnInit() {
  }

  onSave() {
    this.siteService.add(this.data);
  }

}
