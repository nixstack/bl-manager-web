import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SiteNamePipe } from './pipe/site-name.pipe';



@NgModule({
  declarations: [
    SiteNamePipe
  ],
  imports: [
    CommonModule,
    MaterialComponentModule,
    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    MaterialComponentModule,
    FlexLayoutModule,
    SiteNamePipe
  ]
})
export class ShareModule { }
