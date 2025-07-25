import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, } from '@angular/router';
import { Observable } from 'rxjs';
import { _isAuthenticated, AuthCheckService } from '../../../core/services/Identity/auth-check.service';

import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnAuthorizedModalComponents } from 'src/shared/dialogs/informations/unauthorized-modal';

export const roleGuard: CanActivateFn = async (route, state) => {



    let router = inject(Router);
    let jwtHelperService = inject(JwtHelperService);
    let ngbModal = inject(NgbModal);
    let token = JSON.parse(localStorage.getItem("tokenData"))
    if (token) {
        const decoded = jwtHelperService.decodeToken(token.accessToken);

        const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
        const roles: string[] = Array.isArray(decoded[roleClaim])
            ? decoded[roleClaim]
            : [decoded[roleClaim]];

        if (roles.includes('Admin')) {
            return true;
        }

        const modalRef = ngbModal.open(UnAuthorizedModalComponents, {
            size: 'md',
            backdrop: 'static',
        });
        modalRef.componentInstance.data = 'UnAuthorized Kartı';
        // modalRef.result.then(async (event) => {
        //     if (event == true) {

        //     }
        // });
        try {
            await modalRef.result; // modal kapanana kadar bekler
        } catch (e) {
          
        }
    }

    // router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //     router.navigate(['/']);
    // });
    return false;
}
