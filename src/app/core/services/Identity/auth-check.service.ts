import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {
  resultObj: any;
  constructor( private router: Router,private jwtHelper:JwtHelperService) {}

  role: any;
  identityCheck() {

    const tokenData: string = localStorage.getItem("tokenData");

    if (tokenData) {
      const token = JSON.parse(tokenData).accessToken
  
   
    let expired: any;



    if (_isAuthenticated == undefined) {
      
      if (token ) {
        _isAuthenticated = true;

      }
    }
    else {
      _isAuthenticated = token != null 
    }

  }


  }
  get isAuthenticated(): boolean {
    return _isAuthenticated;
  }
}

export let _isAuthenticated: boolean;