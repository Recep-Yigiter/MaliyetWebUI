import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';


@Injectable({
  providedIn: 'root'
})
export class MakineSasesiService {
  decode: any;
  loggedUserData:any;
  constructor(
    private apiService: ApiClientService,

  ) {

  }

  async create(create: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     



    const observable = this.apiService.post({
      controller: "MakineSasesis",
      action: "CreateMakineSasesi",
       
    }, create)

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  async update(update: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     


    const observable = await this.apiService.put({
      controller: "MakineSasesis",
      action: "UpdateMakineSasesi",
       
    }, update)
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);
    return await promiseData;
  }
  async delete(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     


    const observable = await this.apiService.delete({
      controller: "MakineSasesis",
      queryString: "id=" + `${id}`,
       
    })
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);
    return await promiseData;
  }
  async GetAll(successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
      
    const observable: Observable<any> = this.apiService.get(
      {
        controller: "MakineSasesis",
        action: "GetAllMakineSasesis",
      });
    const promiseData = firstValueFrom(observable);

    promiseData.then(successCallBack).catch(errorCallBack);

   
    return await promiseData;
  }


  async getById(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     
    const observable = this.apiService.get({
      controller: "MakineSasesis",
      action: "GetById/" + `${id}`,
       
    })

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  async getCode(durum: boolean, successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
     


    const observable = this.apiService.get<{ kod: any }>(
      {
        controller: "MakineSasesis",
        action: "GetCode",
        queryString: `Durum=${durum}`,
         
      });

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
  }












}




