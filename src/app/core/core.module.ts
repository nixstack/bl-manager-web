import { NgModule } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpInterceptor } from './http-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    ConfigService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true }
  ]
})
export class CoreModule { }
