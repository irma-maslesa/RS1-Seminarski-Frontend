import { Component } from '@angular/core';

@Component({
  selector: 'stadion-search',
  templateUrl: './stadion-search.component.html',
  styleUrls: ['./stadion-search.component.scss']
})
export class StadionSearchComponent {

  searchObject;

  submit(searchObject) {
    this.searchObject = searchObject;

    if (searchObject.naziv === '')
      this.searchObject.ime = null;
  }
}
