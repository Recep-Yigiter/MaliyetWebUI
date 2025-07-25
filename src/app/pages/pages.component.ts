import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/services/Identity/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModalTriggerService } from '../core/services/modal-trigger.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UnAuthorizedModalComponents } from 'src/shared/dialogs/informations/unauthorized-modal';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  user: any;
  constructor(
    private router: Router,
    private UserService: UserService,
    private jwtHelperService: JwtHelperService,

  ) { }

  ngOnInit() {

    const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    const nameClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
    const idClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';





    let token = JSON.parse(localStorage.getItem("tokenData"))
    const decode = this.jwtHelperService.decodeToken(token.accessToken);


    const roles: string[] = decode[roleClaim];
    const name: string = decode[nameClaim];
    const userId: string = decode[idClaim];


    console.log('Kullanıcı Adı:', name);
    console.log('Kullanıcı ID:', userId);
    console.log('Roller:', roles);

  }

  activeModule() {

  }

  moduls = [
    {
      modul: 'Maliyet',
      icon: 'fa-solid fa-receipt',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: '/maliyet/kabin-maliyet',
      disabled: false,
      localStorage: 'maliyet'
    },

    {
      modul: 'Tanımlar',
      icon: 'fa-solid fa-receipt',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: '/tanimlar/stok',
      disabled: false,
      localStorage: 'stok'
    },
    {
      modul: 'Genel',
      icon: 'fa-solid fa-receipt',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: '/genel/kabin',
      disabled: false,
      localStorage: 'stok'
    },


  ];


  show() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  selectedTab: any
  routerChange(item) {

    if (item.href == "/maliyet/kabin-maliyet") {
      const local1 = JSON.parse(localStorage.getItem('maliyet'));
      this.router.navigate([local1.href])
    }
    else if (item.href == "/tanimlar/stok") {
      const local2 = JSON.parse(localStorage.getItem('tanimlar'));
      this.router.navigate([local2.href])
    }
    else {

    }


  }



  cikis() {

    localStorage.removeItem("tokenData")
    window.location.reload()

  }







  isDropdownOpen = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside =
      event.target instanceof HTMLElement &&
      event.target.closest('.portHeadLightMenu');

    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }
}

