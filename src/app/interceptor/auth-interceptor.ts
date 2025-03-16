import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getLoginInfo();
    this.loaderService.show();

    request = request.clone({
     setHeaders: {
      'ngrok-skip-browser-warning': 'true',
     },
    });
    
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token.token}` },
      }); 
    }


    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);
        console.log('Erreur tokent')
        if (err.status === 401 || err.status === 403) {
            this.router.navigate(['/login']);
        } 
        return throwError(err);
      }),
      finalize(() => {
        this.loaderService.hide(); // Hide the loader when the request finishes (success or error)
      })
    );

  }
}
