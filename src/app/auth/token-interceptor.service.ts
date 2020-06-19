import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req, next) {

    if (req.headers.get('skip')) {
      return next.handle(req);
    }


    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getJwtToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
