import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent {
 menu = [
    {
      label: '',
      expanded: false,
      icon: '',
      href: '',
      submenu: [
        {
          label: 'Roller',
          tabItem:'role',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/administration/role',
          expanded: false,
        },
        {
          label: 'Kullanıcılar',
          tabItem:'user',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/administration/user',
          expanded: false,
        }, 
        {
          label: 'Authorize Menu',
          tabItem:'authorize-menu',
          icon: 'fa fa-inbox',
          submenu: [],
          href: '/administration/authorize-menu',
          expanded: false,
        }, 
      ],
    },
  

  ];

    

  constructor(private router:Router) {}
  ngOnInit(): void {

    // const local = JSON.parse(localStorage.getItem('genel'));
 
    // this.selectedTab=local.tabItem;
  }

  toggleNode(node: any) {
    node.expanded = !node.expanded;
  }


  selectedTab: string = 'kabin';

  selectTab(tab: any) {
    var local= localStorage.setItem('genel',JSON.stringify(tab))
    this.selectedTab = tab.tabItem; 
    this.router.navigate([`${tab.href}`])
  }

}

