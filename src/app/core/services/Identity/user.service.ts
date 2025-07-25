import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  decode: any;
  loggedUserData: any;
  public redirectUrl: string;

  constructor(
    private apiService: ApiClientService,

  ) {

  }

  async create(create: any, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {




    const observable = this.apiService.post({
      controller: "Users",
      action: "CreateUser",

    }, create)

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  
  async login(loginObj: any, successCallBack?: (res) => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {

    const observable = this.apiService.post({
      controller: "Users",
      action: "Login",
    }, loginObj)

    const promiseData = firstValueFrom(observable);

    promiseData.then(successCallBack).catch(errorCallback);
    return await promiseData;
  }

  async GetAll(successCallBack?: () => void, errorCallBack?: (errorMessage: HttpErrorResponse) => void) {
    const observable: Observable<any> = this.apiService.get(
      {
        controller: "Users",
        action: "GetAllUsers",

      });
    const promiseData = firstValueFrom(observable);

    promiseData.then(successCallBack).catch(errorCallBack);

    return await promiseData;
  }

  async AssignRoleToUser(id:string,roles:string[], successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     
     const observable = this.apiService.post({
      controller: "Users",
      action: "AssignRoleToUser",
    }, {userId:id,roles:roles})

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }


async GetRolesToUser(id:string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     
     const observable = this.apiService.get({
      controller: "Users",
      action: "GetRolesToUser/"+`${id}`,
    })

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }


}





