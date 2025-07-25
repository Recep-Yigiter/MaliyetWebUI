import { ErrorHandler, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';



@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor() { }

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  return next.handle(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        // Eğer response'un body’si undefined veya boşsa parse etmeye çalışma
        if (event.body && typeof event.body === 'string') {
          try {
            const parsed = JSON.parse(event.body);
            // parsed veriyi bir işlemde kullan
          } catch (e) {
            console.error('Geçersiz JSON:', event.body);
          }
        }
      }
    })
  );
}
}
