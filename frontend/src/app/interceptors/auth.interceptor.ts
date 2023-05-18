import { HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { User } from '../models/interfaces/User';

const TOKEN_HEADER_KEY = 'Authorization'; // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    const user: User = this.storageService.getUser();
    if (user != null && user['accessToken'] != null) {
      // for Spring Boot back-end
      authReq = req.clone({
        headers: req.headers.set(
          TOKEN_HEADER_KEY,
          `${user.tokenType} ${user.accessToken}`
        ),
      });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
