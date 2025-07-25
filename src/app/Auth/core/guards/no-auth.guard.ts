import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, } from '@angular/router';
import { Observable } from 'rxjs';
import { _isAuthenticated, AuthCheckService } from '../../../core/services/Identity/auth-check.service';
import { JwtHelperService } from '@auth0/angular-jwt';


export const noAuthGuard: CanActivateFn = (route, state) => {
    let router = inject(Router);
    let jwtHelper = inject(JwtHelperService);
    let authCheckService = inject(AuthCheckService);


    const token:any = localStorage.getItem('tokenData');

    if (token) {
        return false;
    }
    return true;
}
