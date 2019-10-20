import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as jsoneditor from 'jsoneditor';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss']
})
export class JsonEditorComponent implements OnInit {
  @Input() options: JsonEditorOptions = new JsonEditorOptions();
  @Input() data: {};

  @ViewChild('jsonEditorContainer', {static: true}) jsonEditorContainer: ElementRef;

  private editor: any;

  constructor() { }

  ngOnInit() {
    this.editor = new jsoneditor(this.jsonEditorContainer.nativeElement, this.options, this.data);
  }

  public collapseAll() {
    this.editor.collapseAll();
  }

  public expandAll() {
    this.editor.expandAll();
  }

  public focus() {
    this.editor.focus();
  }

  public get(): JSON {
    return this.editor.get();
  }

  public getMode(): JsonEditorMode {
    return this.editor.getMode() as JsonEditorMode;
  }

  public getName(): string {
    return this.editor.getName();
  }

  public getText(): string {
    return this.editor.getText();
  }

  public set(json: JSON) {
    this.editor.set(json);
  }

  public setMode(mode: JsonEditorMode) {
    this.editor.setMode(mode);
  }

  public setName(name: string) {
    this.editor.setName(name);
  }

  public setSchema(schema: any) {
    this.editor.setSchema(schema);
  }

  public setOptions(newOptions: JsonEditorOptions) {
    if (this.editor) {
      this.editor.destroy();
    }
    this.options = newOptions;
    this.ngOnInit();
  }

  public destroy() {
    this.editor.destroy();
  }
}

export type JsonEditorMode = 'tree' | 'view' | 'form' | 'code' | 'text';

export class JsonEditorOptions {
  public ace: {};
  public ajv: {};
  public onChange: () => void;
  public onEditable: (node: JsonEditorTreeNode | {}) => boolean | { field: boolean, value: boolean };
  public onError: (error: any) => void;
  public onModeChange: (newMode: JsonEditorMode, oldMode: JsonEditorMode) => void;
  public escapeUnicode: boolean;
  public sortObjectKeys: boolean;
  public history: boolean;
  public mode: JsonEditorMode;
  public modes: JsonEditorMode[];
  public name: string;
  public schema: {};
  public search: boolean;
  public indentation: number;
  public theme: number;
  public language: string;
  public languages: {};

  constructor() {
    this.escapeUnicode = false;
    this.sortObjectKeys = false;
    this.history = true;
    this.mode = 'tree';
    this.search = true;
    this.indentation = 2;
  }

}

export interface JsonEditorTreeNode {
  field: string;
  value: string;
  path: string[];
}
