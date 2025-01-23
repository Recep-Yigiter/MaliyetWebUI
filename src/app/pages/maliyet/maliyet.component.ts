import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maliyet',
  templateUrl: './maliyet.component.html',
  styleUrls: ['./maliyet.component.scss']
})
export class MaliyetComponent implements OnInit {
  
  menu = [
    {
      label: '',
      expanded: false,
      icon: '',
      href: '',
      submenu: [
        {
          label: 'Kabin',
          tabItem:'kabin',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/maliyet/kabin-maliyet',
          expanded: false,

        },
        {
          label: 'Buton',
          tabItem:'buton',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/maliyet/buton-maliyet',
          expanded: false,
        },
        {
          label: 'Kapı',
          tabItem:'kapı',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/maliyet/kapi-maliyet',
          expanded: false,
        },
        {
          label: 'Kasnak',
          tabItem:'kasnak',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/maliyet/kasnak-maliyet',
          expanded: false,
        },
        {
          label: 'Süspansiyon',
          tabItem:'suspansiyon',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/maliyet/suspansiyon-maliyet',
          expanded: false,
        },
        {
          label: 'Makine Saşesi',
          tabItem:'makine-sasesi',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/maliyet/makine-sasesi-maliyet',
          expanded: false,
        },
        
       
      
        
        
        
      ],
    },
  

  ];

    

  constructor(private router:Router) {}
  ngOnInit(): void {
    const local = JSON.parse(localStorage.getItem('maliyet'));
    this.selectedTab=local.tabItem;
  }

  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }


  selectedTab: string = 'kabin';

  selectTab(tab: any) {
    var local= localStorage.setItem('maliyet',JSON.stringify(tab))
    this.selectedTab = tab.tabItem; 
    this.router.navigate([`${tab.href}`])
  }
}
