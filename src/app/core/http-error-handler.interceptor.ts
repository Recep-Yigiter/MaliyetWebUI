

import { HttpEvent, HttpHandler, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { catchError, Observable, of } from 'rxjs';
import { ErrorMessageModalComponents } from 'src/shared/dialogs/informations/error-message-modal';

@Injectable({
  providedIn: 'root'
})
export class HtppErrorHandlerInterceptor {
  cloneRequest: any;
  constructor(private NgbModal: NgbModal) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    return next.handle(req).pipe(catchError(error => {
      let errorMessage = 'Bilinmeyen bir hata oluştu';
      switch (error.status) {

        case HttpStatusCode.Unauthorized://401

          // const modalRef401 = this.NgbModal.open(ErrorMessageModalComponents, {
          //   size: 'md',
          //   backdrop: 'static',
          // });

          // modalRef401.componentInstance.errorMessage = error.error.Messages[0];
          // modalRef401.result.then(async (event) => { });



          if (error.error instanceof ErrorEvent) {
            errorMessage = `Hata: ${error.error.message}`;
          }
          else {
            if (error.status === 500 && error.error.errors) {
              // Validation hataları varsa, her birini al
              const validationErrors = error.error.errors;
              const validationMessages = validationErrors.map((err: any) => `${err.field}: ${err.message}`).join(', ');

              errorMessage = `Doğrulama hatası: ${validationMessages}`;
            } else {
              // Diğer hata durumları
              errorMessage = `Beklenmeyen bir hata: ${error.status}`;
            }
          }








          break;


        case HttpStatusCode.InternalServerError://500


          if (error.error instanceof ErrorEvent) {
            errorMessage = `Hata: ${error.error.message}`;
          } else {

            if (error.error['ErrorMessages']) {
              const validationErrors = error.error['ErrorMessages'];
              const validationMessages = validationErrors.map((err: any) => `${err}`).join(', ');

              errorMessage = `hata: ${validationMessages}`;
              const modalRef500 = this.NgbModal.open(ErrorMessageModalComponents, {
                size: 'md',
                backdrop: 'static',
              });
              modalRef500.componentInstance.statusCode = error.status;
              modalRef500.componentInstance.errorMessage = errorMessage;
              modalRef500.result.then(async (event) => { });
            } else {
              errorMessage = `Beklenmeyen bir hata: ${error.status}`;
              const modalRef500 = this.NgbModal.open(ErrorMessageModalComponents, {
                size: 'md',
                backdrop: 'static',
              });
              modalRef500.componentInstance.statusCode = error.status;
              modalRef500.componentInstance.errorMessage = errorMessage;
              modalRef500.result.then(async (event) => { });
            }
          }


          break;


        case HttpStatusCode.BadRequest://400

          const modalRef400 = this.NgbModal.open(ErrorMessageModalComponents, {
            size: 'md',
            backdrop: 'static',
          });
          console.log(error);
          modalRef400.componentInstance.errorMessage = error.error.Messages[0];
          modalRef400.result.then(async (event) => { });
          break;


        case HttpStatusCode.NotFound: //404

          break;


        default:
          errorMessage = `Beklenmeyen bir hata oluştu.`;
          const modalRefDefault = this.NgbModal.open(ErrorMessageModalComponents, {
            size: 'md',
            backdrop: 'static',
          });
          modalRefDefault.componentInstance.statusCode = error.status;
          modalRefDefault.componentInstance.errorMessage = errorMessage;
          modalRefDefault.result.then(async (event) => { });

          break;
      }

      return of(error);
    }))

  }


}















