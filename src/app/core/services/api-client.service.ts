import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { ErrorMessageModalComponents } from 'src/shared/dialogs/informations/error-message-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})

export class ApiClientService{
    constructor(private http:HttpClient,@Inject("baseUrl") private baseUrl: string,private NgbModal:NgbModal) {}

    private url(requestParameter: Partial<RequestParameters>): string {
      return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ? `/${requestParameter.action}` : ""}`;
    }




    get<T>(requestParameter: Partial<RequestParameters>, id?: string) {
      let url: string = "";
      if (requestParameter.fullEndPoint) {
        url = requestParameter.fullEndPoint;
      }
      else {
        url = `${this.url(requestParameter)}${id ? `/${id}` : ''}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
      }
      return this.http.get<T>(url, { headers: requestParameter.headers });
    }

    postbyDynamic<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>) {
      let url: string = ""
      requestParameter.action = "ByDynamic"
      if (requestParameter.fullEndPoint) {
        url = requestParameter.fullEndPoint;
      }
      else {
        
        url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`
      }
      return this.http.post<T>(url, body, { headers: requestParameter.headers })
    }


    post<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>) {

      let url: string = ""
      if (requestParameter.fullEndPoint) {
        url = requestParameter.fullEndPoint;
      }
      else {
        url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`
      }
      return this.http.post<T>(url, body, { headers: requestParameter.headers })
    }

    put<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>) {
      let url: string = ""
      if (requestParameter.fullEndPoint) {
        url = requestParameter.fullEndPoint;
      }
      else {
        url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`
      }
      return this.http.put<T>(url, body, { headers: requestParameter.headers })
    }
    
    delete<T>(requestParameter: Partial<RequestParameters>) {
      let url: string;
      if (requestParameter.fullEndPoint) {
        url = requestParameter.fullEndPoint;
      }
      else {
        url = `${this.url(requestParameter)}/delete${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
      }
  
      return this.http.delete<T>(url, { headers: requestParameter.headers });
    }
    

    deleteRange<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>) {
      let url: string = ""
      if (requestParameter.fullEndPoint) {
        url = requestParameter.fullEndPoint;
      }
      else {
        url = `${this.url(requestParameter)}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`
      }
      return this.http.post<T>(url, body, { headers: requestParameter.headers })
    }

    getById<T>(requestParameter: Partial<RequestParameters>,id:string){

      let url: string = "";
      if (requestParameter.fullEndPoint) {
        url = requestParameter.fullEndPoint;
      }
      else {
        url = `${this.url(requestParameter)}${id ? `/${id}` : ''}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;
      }
      return this.http.get<T>(url, { headers: requestParameter.headers });
      
    }


    

}


export class RequestParameters {
  controller?: string;
  queryString?: string;
  action?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;

}