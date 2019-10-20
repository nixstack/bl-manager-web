import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { TemplateModel } from '../../tempate.model';
import { TemplateService } from '../../template.service';

@Component({
  selector: 'app-template-delete',
  templateUrl: './template-delete.component.html',
  styleUrls: ['./template-delete.component.scss']
})
export class TemplateDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: TemplateModel,
              private templateService: TemplateService) { }

  ngOnInit() {
  }

  onConfirm() {
    this.templateService.delete(this.data);
  }

}
