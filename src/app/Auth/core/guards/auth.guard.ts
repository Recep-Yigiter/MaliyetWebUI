import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, } from '@angular/router';
import { Observable } from 'rxjs';
import { _isAuthenticated, AuthCheckService } from '../../../core/services/Identity/auth-check.service';


export const authGuard: CanActivateFn = (route, state) => {



  let router = inject(Router);
  let authCheckService = inject(AuthCheckService);


  authCheckService.identityCheck();
  if (!_isAuthenticated) {

    router.navigate(["login"], { queryParams: { returnUrl: state.url } })
  }
 
  return true;
}
