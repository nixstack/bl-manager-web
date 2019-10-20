import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { CategoryComponent } from './category/category.component';


const routes: Routes = [
  { path: '', component: FeatureComponent },
  { path: 'category', component: CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
