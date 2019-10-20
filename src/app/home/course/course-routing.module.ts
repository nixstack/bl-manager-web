import { NgModule } from '@angular/core';
import { CourseComponent } from './course.component';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { MineComponent } from './mine/mine.component';

const routes: Routes = [
  { path: '', component: CourseComponent },
  { path: 'manage', component: MineComponent },
  { path: 'manage/add', component: ManageComponent },
  { path: 'manage/:id', component: ManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
