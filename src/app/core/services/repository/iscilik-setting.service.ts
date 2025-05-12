import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';


@Injectable({
  providedIn: 'root'
})
export class IscilikSettingService {
  decode: any;
  loggedUserData:any;
  constructor(
    private apiService: ApiClientService,

  ) {

  }

  async create(create: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     



    const observable = this.apiService.post({
      controller: "IscilikSettings",
      action: "CreateIscilikSetting",
       
    }, create)

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  async update(update: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     


    const observable = await this.apiService.put({
      controller: "IscilikSettings",
      action: "UpdateIscilikSetting",
       
    }, update)
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);
    return await promiseData;
  }
  async delete(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
    // https://localhost:7054/api/IscilikSettings/Delete/delete?id=1c91ccfc-a2e5-4930-84d1-1c794036eff9


    const observable = await this.apiService.delete({
      controller: "IscilikSettings",
      action:"Delete",
      queryString: "id=" + `${id}`,
       
    },)
    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);
    return await promiseData;
  }
  async GetAll(successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
      
    const observable: Observable<any> = this.apiService.get(
      {
        controller: "IscilikSettings",
        action: "GetAllIscilikSettings",
      });
    const promiseData = firstValueFrom(observable);

    promiseData.then(successCallBack).catch(errorCallBack);

   
    return await promiseData;
  }


  async getById(id: string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     
    const observable = this.apiService.get({
      controller: "IscilikSettings",
      action: "GetById/" + `${id}`,
       
    })

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  async getCode(durum: boolean, successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
     


    const observable = this.apiService.get<{ kod: any }>(
      {
        controller: "IscilikSettings",
        action: "GetCode",
        queryString: `Durum=${durum}`,
         
      });

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
  }












}





