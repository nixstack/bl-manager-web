import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ModelModelNode, ModelModel } from './model.model';
import { ModelService } from './model.service';
import { ModelAddComponent } from './dialog/model-add/model-add.component';
import { JsonEditorComponent } from '@lib/json-editor';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  @ViewChildren(JsonEditorComponent) jsonEditors: QueryList<JsonEditorComponent>;

  private dataSource = new MatTableDataSource<ModelModelNode>();
  displayedColumns: string[] = [
    'name',
    'model',
    'actions'
  ];

  constructor(private dialog: MatDialog,
              private service: ModelService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.dataStore.subscribe((res: any) => {
      this.dataSource.data = res.list;
    });
  }

  onAdd() {
    this.dialog.open(ModelAddComponent, {
      data: new ModelModelNode()
    });
  }

  onDelete(idx, row) {
    this.service.delete({...row, index: idx});
  }

  onEdit(i, row) {
    const alteredIns = (this.jsonEditors as any)._results[i] as JsonEditorComponent;
    this.service.edit({...{...row, model: alteredIns.get()}, index: i});
  }

}
