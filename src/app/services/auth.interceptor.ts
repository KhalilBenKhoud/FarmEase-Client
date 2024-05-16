import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

const unallowedRequests = [
	'/auth/refresh_token',
	'/auth/register',
	'/auth/authenticate',
    '/auth/forget-password',
    '/auth/verify-forget-token',
    '/auth/reset-password',
    '/auth/resendVerification',
     '/auth/verifyAccount',
     '/auth/logout'
     
];
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!unallowedRequests.includes(request.url.substring(`${environment.BaseApiUrl}`.length)) && this.authService.isLoggedOut == false) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        });
      }
    }
    return next.handle(request).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
            const isWhitelisted = !unallowedRequests.includes(request.url.substring(`${environment.BaseApiUrl}`.length));
            if (isWhitelisted && this.authService.isLoggedOut == false) {
              return this.handleUnauthorized(request, next);
            }
          }
          return throwError(error);
        })
      );
    }

    private handleUnauthorized(request: HttpRequest<any>, next: HttpHandler) {
        return this.authService.refreshToken().pipe(
          switchMap((response : any) => {
            localStorage.setItem('accessToken', response.access_token);
           // console.log("from interceptor",response.access_token) ;
            return next.handle(
              request.clone({
                setHeaders: { Authorization: `Bearer ${response.access_token}` },
              })
            );
          }),
          catchError((error) => throwError(error))
        );
    

        }
    }
