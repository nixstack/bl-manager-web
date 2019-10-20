import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { SiteComponent } from './site/site.component';
import { TemplateComponent } from './template/template.component';
import { PageComponent } from './page/page.component';
import { ModelComponent } from './model/model.component';
import { ServerComponent } from './server/server.component';


const routes: Routes = [
  { path: '', component: PagesComponent },
  { path: 'site', component: SiteComponent },
  { path: 'template', component: TemplateComponent },
  { path: 'page', component: PageComponent},
  { path: 'model', component: ModelComponent},
  { path: 'server', component: ServerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
