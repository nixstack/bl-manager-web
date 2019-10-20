import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ModelModelNode } from '../../model.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ModelService } from '../../model.service';
import { JsonEditorComponent } from '@lib/json-editor';

@Component({
  selector: 'app-model-add',
  templateUrl: './model-add.component.html',
  styleUrls: ['./model-add.component.scss']
})
export class ModelAddComponent implements OnInit {
  @ViewChild('jsonEditor', { static: true }) JsonEditor: JsonEditorComponent;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModelModelNode,
              private modelService: ModelService) { }

  ngOnInit() {
  }

  onSave() {
    this.modelService.add({...this.data, model: this.JsonEditor.get()});
  }

}
