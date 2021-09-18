import { Component } from '@angular/core';

@Component({
  selector: 'klub-search',
  templateUrl: './klub-search.component.html',
  styleUrls: ['./klub-search.component.scss']
})
export class KlubSearchComponent {

  searchObject;

  submit(searchObject) {
    this.searchObject = searchObject;

    if (searchObject.naziv === '')
      this.searchObject.ime = null;
  }
}
