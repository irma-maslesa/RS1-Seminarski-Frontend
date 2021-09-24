import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import data from './../assets/config/menu.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-name';
  menuList;

  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (localStorage.getItem("token")) {
          this.menuList = data.payload2.children;
        }
        else
          this.menuList = data.payload1.children;
      }
    });
  }
}
