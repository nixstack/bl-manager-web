import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      // {path: '', redirectTo: 'main', pathMatch: 'full'},
      { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
      { path: 'course', loadChildren: './course/course.module#CourseModule' },
      { path: 'feature', loadChildren: './feature/feature.module#FeatureModule' }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
