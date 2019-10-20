
import { HttpInterceptor as BaseHttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponseBase,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { mergeMap, tap, catchError } from 'rxjs/operators';

declare var toastr: any;

// @Injectable()
export class HttpInterceptor implements BaseHttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({ url: environment.baseApi + request.url });
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // console.log(event);
            if (event.body && event.body.flag !== 0) {
              toastr.error(`错误码：${event.body.code}`, event.body.message);
            }
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            toastr.error(`错误码：${err.status}`, err.message);
          }
        }),
      // catchError(error => {
      //   console.log(error);
      // })
    );
  }
}

