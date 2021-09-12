import { Component } from '@angular/core';

import data from './../../../assets/config/menu.json';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menuList = data.payload.children
}
