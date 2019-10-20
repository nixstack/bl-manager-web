import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatSelectModule } from '@angular/material';
import { ToasterService } from './share/toaster.service';
import { ShareModule } from './share/share.module';
// import { ShareModule } from './share/share.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // FormsModule, // 不生效：Can't bind to 'ngModel' since it isn't a known property of 'mat-select'
    // MatInputModule,
    // MatSelectModule,
    HttpClientModule, // NullInjectorError: StaticInjectorError(AppModule)[HttpClient]
    ShareModule,
    CoreModule,
  ],
  providers: [
    ToasterService, // 依懒ShareModule，里ShareModule包含MatSnackBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
