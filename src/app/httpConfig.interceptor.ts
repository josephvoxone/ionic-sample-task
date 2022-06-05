import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
  } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { map, catchError } from 'rxjs/operators';
  import { Injectable } from '@angular/core';
  import { HelperService } from './service/helper/helper.service';
  import { ProfileService } from './service/profile/profile.service';
  
  @Injectable()
  export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
      private helperService: HelperService,
      private profileService: ProfileService
    ) {}
  
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {

      const token = this.profileService.getToken();
  
      //Authentication by setting header with token value
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
  
      // if (!request.headers.has('Content-Type')) {
      //   request = request.clone({
      //     setHeaders: {
      //       'content-type': 'application/json'
      //       'content-type': 'application/x-www-form-urlencoded'
      //     }
      //   });
      // }
  
      // request = request.clone({
      //   headers: request.headers.set('Accept', 'application/json')
      // });
  
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 0) {
            return throwError({
              error: { msg: 'Connection problem!' },
            });
          }
          if (error.status === 401) {
            if (error.error.success === false) {
              console.log('Interceptor', error);
            } else {
              console.log('Interceptor', error);
              // this.navCtrl.navigateRoot('/welcome');
            }
          }
          return throwError(error);
        })
      );
    }
  }
  