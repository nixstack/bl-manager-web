import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { NavigationService } from './navigation.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatIconModule, MatRippleModule } from '@angular/material';
import { NavCollapseComponent } from './nav-collapse/nav-collapse.component';
import { NavItemComponent } from './nav-item/nav-item.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavigationComponent, NavCollapseComponent, NavItemComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatRippleModule,
    PerfectScrollbarModule,
    RouterModule
  ],
  exports: [
    NavigationComponent
  ],
  providers: [
    NavigationService
  ],
})
export class NavigationModule { }
