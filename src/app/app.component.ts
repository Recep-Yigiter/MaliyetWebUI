import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user: any;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {



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










    //   localStorage.setItem('menu',item)
    //   this.selectedTab = item;  
    // this.router.navigate([local])
    // console.log("item",item);
    // console.log("local",local);

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
