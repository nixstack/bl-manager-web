import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './feature.component';
import { CategoryComponent } from './category/category.component';
import { CategoryRoutingModule } from './feature-routing.module';
import { ShareModule } from 'src/app/share/share.module';
import { MatTreeModule } from '@angular/material';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [FeatureComponent, CategoryComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatTreeModule,
    ShareModule,
    CategoryRoutingModule
  ]
})
export class FeatureModule { }
