import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatSidenavModule } from '@angular/material';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { BrandModule } from './brand/brand.module';
import { NavigationModule } from './navigation/navigation.module';
import { ShareModule } from '../share/share.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    // FormsModule,
    // MatSidenavModule,
    ShareModule,
    BrandModule,
    NavigationModule,
    HeaderModule,
    FooterModule,
    FlexLayoutModule,
  ]
})
export class HomeModule { }
