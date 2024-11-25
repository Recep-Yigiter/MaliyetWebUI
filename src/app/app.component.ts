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
    console.log('Route changed!');
  }

  

  moduls = [
    // {
    //   modul: 'Malz. Yönetimi',
    //   icon: 'fa-solid fa-receipt',
    //   class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
    //   href: 'tanimlar',
    //   disabled: false,
    // },
    {
      modul: 'Maliyet',
      icon: 'fa-solid fa-receipt',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: 'maliyet',
      disabled: false,
    },
    {
      modul: 'Satış Fiyatı',
      icon: 'fa-solid fa-receipt',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: 'satis-fiyati',
      disabled: false,
    },
    
    {
      modul: 'Tanımlar',
      icon: 'fa-solid fa-receipt',
      class: 'text-slate-600 text-2xl group-hover:text-cyan-700',
      href: 'tanimlar',
      disabled: false,
    },
    
   
  ];

  cikis() {
    localStorage.removeItem('tokenData');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  show() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  isDropdownOpen = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Eğer tıklama dropdown dışında bir yerde olduysa menüyü kapat
    const clickedInside =
      event.target instanceof HTMLElement &&
      event.target.closest('.portHeadLightMenu');

    if (!clickedInside) {
      this.isDropdownOpen = false;
    }
  }
}
