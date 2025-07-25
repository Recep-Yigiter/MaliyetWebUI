import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';
import { ErrorMessageModalComponents } from 'src/shared/dialogs/informations/error-message-modal';

// const token:any = localStorage.getItem('tokenData');
// const token = JSON.parse(localStorage.getItem('tokenData'));
//   const headers = new HttpHeaders({
//     'Authorization': `Bearer ${token.accessToken}`
//   });
@Injectable({
  providedIn: 'root'
})
export class KabinService {
  decode: any;
  loggedUserData: any;
  constructor(
    private apiService: ApiClientService, private NgbModal: NgbModal

  ) {

  }




  async create(create: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {



     
    const observable = this.apiService.post({
      controller: "Kabins",
      action: "CreateKabin",
      // headers: {
      //   'Authorization': `Bearer ${token}`
      // }

    }, create)

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  async update(update: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {



    const observable = await this.apiService.put({
      controller: "Kabins",
      action: "UpdateKabin",

    }, update)
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);
    return await promiseData;
  }
  async delete(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {



    const observable = await this.apiService.delete({
      controller: "Kabins",
      action: "Delete",
      queryString: "id=" + `${id}`,

    },)
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);
    return await promiseData;
  }
  // async GetAll(successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {

  //   const observable: Observable<any> = this.apiService.get(
  //     {
  //       controller: "Kabins",
  //       action: "GetAllKabins",
  //     });
  //   const promiseData = firstValueFrom(observable);

  //   promiseData.then(successCallBack).catch(errorCallBack);


  //   return await promiseData;
  // }

  async GetAll(successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
    const observable: Observable<any> = this.apiService.get(
      {
        controller: "Kabins",
        action: "GetAllKabins",
        // headers:headers
      });
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallBack);
    return await promiseData;
  }
  async getById(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {

    const observable = this.apiService.get({
      controller: "Kabins",
      action: "GetById/" + `${id}`,

    })

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  async getCode(durum: boolean, successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {



    const observable = this.apiService.get<{ kod: any }>(
      {
        controller: "Kabins",
        action: "GetCode",
        queryString: `Durum=${durum}`,

      });

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
  }












}





