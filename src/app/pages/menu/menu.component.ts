import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import data from './../../../assets/config/menu.json';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnChanges {
  @Input() menuList = data.payload1.children;

  ngOnChanges(changes: SimpleChanges): void {
    var currentObject = changes.menuList;

    if (!currentObject.firstChange) {
      this.menuList = currentObject.currentValue;
    }
  }
}
