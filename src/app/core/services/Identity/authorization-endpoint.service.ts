import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiClientService } from 'src/app/core/services/api-client.service';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationEndpointService {
  decode: any;
  constructor(
    private apiService: ApiClientService,

  ) {}


  async AssignRoleEndpoint(roles:string[],menu:string,code:string, successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     
     const observable = this.apiService.post({
      controller: "AuthorizationEndPoints",
      action: "AssignRoleEndPoint",
    }, {roles,menu,code})

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }
  
  async getRoleToEndpoints(code: string, menu:string,successCallBack?: () => void, errorCallback?: (errorMessage: HttpErrorResponse) => void) {
     


    const observable = this.apiService.post({
      controller: "AuthorizationEndPoints",
      action: "GetRolesToEndpoints",
       
    },{code,menu})

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch(errorCallback);

    return await promiseData;
  }



}





