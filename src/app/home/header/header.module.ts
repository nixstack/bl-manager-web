import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule, // Can't bind to 'fxHide' since it isn't a known property of 'button'
  ],
  exports: [HeaderComponent] // 必须声明，否则报错：'app-header' is not a known element
})
export class HeaderModule { }
