import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { CourseRoutingModule } from './course-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { PlanComponent } from './manage/plan/plan.component';
import { MatTreeModule } from '@angular/material';
import { ManageComponent } from './manage/manage.component';
import { MineComponent } from './mine/mine.component';
import { PlanAddComponent } from './manage/plan/dialog/plan-add/plan-add.component';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from '@lib/file-upload';
import { CoursePicComponent } from './manage/course-pic/course-pic.component';
import { CoursePublishComponent } from './manage/course-publish/course-publish.component';
import { CourseBaseComponent } from './manage/course-base/course-base.component';
// import { MatFileUploadModule } from 'angular-material-fileupload';



@NgModule({
  declarations: [
    CourseComponent,
    ManageComponent,
    PlanComponent,
    MineComponent,
    PlanAddComponent,
    CoursePicComponent,
    CoursePublishComponent,
    CourseBaseComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ShareModule, // 引入material组件
    MatTreeModule,
    FormsModule,
    // MatFileUploadModule,
    FileUploadModule,
  ],
  entryComponents: [
    PlanAddComponent
  ]
})
export class CourseModule { }
