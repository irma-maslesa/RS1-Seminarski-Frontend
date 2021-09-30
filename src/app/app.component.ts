import { Component, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Uloga } from './pages/shared/uloga.constant';

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
        if (localStorage.getItem("korisnik")) {
          var korisnik = JSON.parse(localStorage.getItem("korisnik"));
          if (korisnik.uloga == Uloga.ADMINISTRATOR_UTAKMICA)
            this.menuList = data.AUtakmice.children;
          else if (korisnik.uloga == Uloga.ADMINISTRATOR_KLUBOVA)
            this.menuList = data.AKlubovi.children;
          else if (korisnik.uloga == Uloga.KORISNIK)
            this.menuList = data.Korisnik.children;
          else
            this.menuList = data.payload2.children;
        }
        else
          this.menuList = data.payload1.children;
      }
    });
  }

  @HostListener('window:beforeunload')
  unloadHandler(event) {
    if (localStorage.getItem("korisnik")) {
      var korisnik = JSON.parse(localStorage.getItem("korisnik"));
      if (!korisnik.zapamtiMe) {
        localStorage.removeItem("korisnik")
      }
    }
  }
}
