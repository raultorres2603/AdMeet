import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../../Services/auth/auth.service';
import {throwError} from 'rxjs';
import {Iauthservice} from '../../Interfaces/iauthservice';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService: Iauthservice = inject(AuthService)
  if (!authService.isAuthenticated()) {
    if (req.url.includes("api/user/login") || req.url.includes("api/user/register")) {
      return next(req);
    } else {
      return throwError(() => new HttpErrorResponse({
        status: 401,
        statusText: 'Unauthorized',
        error: 'User not authenticated'
      }));
    }
    // Retorna un error sin continuar la solicitud
  }
  return next(req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.getToken()}`
    }
  }));
};
