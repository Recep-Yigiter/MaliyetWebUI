import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const token = JSON.parse(localStorage.getItem('tokenData'));
  // const headers = new HttpHeaders({
  //   'Authorization': `Bearer ${token.accessToken}`
  // });
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token.accessToken}`)
      });
      
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}