import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SiteComponent } from './site/site.component';
import { TemplateComponent } from './template/template.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PageComponent } from './page/page.component';
import { ShareModule } from 'src/app/share/share.module';
import { FormsModule } from '@angular/forms';
import { PageAddComponent } from './page/dialog/page-add/page-add.component';
import { PageEditComponent } from './page/dialog/page-edit/page-edit.component';
import { PageDeleteComponent } from './page/dialog/page-delete/page-delete.component';
import { SiteAddComponent } from './site/dialog/site-add/site-add.component';
import { SiteDeleteComponent } from './site/dialog/site-delete/site-delete.component';
import { SiteEditComponent } from './site/dialog/site-edit/site-edit.component';
import { TemplateAddComponent } from './template/dialog/template-add/template-add.component';
import { TemplateDeleteComponent } from './template/dialog/template-delete/template-delete.component';
import { TemplateEditComponent } from './template/dialog/template-edit/template-edit.component';
import { FileUploadModule } from '@lib/file-upload';
import { JsonEditorModule } from '@lib/json-editor';
import { ModelComponent } from './model/model.component';
import { ModelAddComponent } from './model/dialog/model-add/model-add.component';
import { ServerAddComponent } from './server/dialog/server-add/server-add.component';
import { ServerDeleteComponent } from './server/dialog/server-delete/server-delete.component';
import { ServerEditComponent } from './server/dialog/server-edit/server-edit.component';
import { ServerComponent } from './server/server.component';
import { LinkComponent } from './page/dialog/page-link/page-link.component';



@NgModule({
  declarations: [
    PagesComponent,
    SiteComponent,
    TemplateComponent,
    PageComponent,
    PageAddComponent,
    PageEditComponent,
    PageDeleteComponent,
    SiteAddComponent,
    SiteDeleteComponent,
    SiteEditComponent,
    TemplateAddComponent,
    TemplateDeleteComponent,
    TemplateEditComponent,
    ModelComponent,
    ModelAddComponent,
    ServerComponent,
    ServerAddComponent,
    ServerDeleteComponent,
    ServerEditComponent,
    LinkComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ShareModule, // 引入material组件
    FormsModule, // Can't bind to 'ngModel' since it isn't a known property of 'mat-select'
    FileUploadModule,
    JsonEditorModule
  ],
  entryComponents: [
    PageAddComponent,
    PageEditComponent,
    PageDeleteComponent,
    SiteAddComponent,
    SiteDeleteComponent,
    SiteEditComponent,
    TemplateAddComponent,
    TemplateDeleteComponent,
    TemplateEditComponent,
    ModelAddComponent,
    ServerAddComponent,
    ServerDeleteComponent,
    ServerEditComponent,
    LinkComponent,
  ]
})
export class PagesModule { }
