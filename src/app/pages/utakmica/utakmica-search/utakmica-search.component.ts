import { Component } from '@angular/core';

@Component({
  selector: 'utakmica-search',
  templateUrl: './utakmica-search.component.html',
  styleUrls: ['./utakmica-search.component.scss']
})
export class UtakmicaSearchComponent {

  searchObject;

  submit(searchObject) {
    this.searchObject = searchObject;
  }
}
