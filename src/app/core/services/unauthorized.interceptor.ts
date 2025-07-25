import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ModalTriggerService } from '../services/modal-trigger.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private modalTrigger: ModalTriggerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.modalTrigger.triggerUnauthorized('Bu işlemi yapmaya yetkiniz yok.');
        }
        return throwError(() => error);
      })
    );
  }
}
