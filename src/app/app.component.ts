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
  ) {}

  ngOnInit() {


    
  }
  onRouteChange() {
    this.selectedTab=  localStorage.getItem('menu');
    this.router.navigate([`tanimlar/${this.selectedTab}`])
  }

  

  moduls = [
    {
      modul: 'Maliyet',
      icon: 'fa-solid fa-receipt',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: 'maliyet/kabin-maliyet',
      disabled: false,
      localStorage:'maliyet'
    },
    {
      modul: 'Satış Fiyatı',
      icon: 'fa-solid fa-receipt',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: 'satis-fiyati/kabin',
      disabled: false,
      localStorage:'satisFiyati'
    },
    
    {
      modul: 'Tanımlar',
      icon: 'fa-solid fa-receipt',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: '/tanimlar/stok',
      disabled: false,
      localStorage:'stok'
    },
    
   
  ];


  show() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  selectedTab:any
  routerChange(item){

  var local=  localStorage.getItem('tanimlar')

    localStorage.setItem('menu',item)
    this.selectedTab = item;  
    this.router.navigate([item])
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
