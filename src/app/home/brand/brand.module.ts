import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandComponent } from './brand.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material';



@NgModule({
  declarations: [BrandComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule
  ],
  exports: [BrandComponent]
})
export class BrandModule { }
