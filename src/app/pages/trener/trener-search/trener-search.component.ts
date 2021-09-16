import { Component } from '@angular/core';

@Component({
  selector: 'trener-search',
  templateUrl: './trener-search.component.html',
  styleUrls: ['./trener-search.component.scss']
})
export class TrenerSearchComponent {

  searchObject;

  submit(searchObject) {
    this.searchObject = searchObject;

    if (searchObject.naziv === '')
      this.searchObject.ime = null;
    if (searchObject.prezime === '')
      this.searchObject.prezime = null;
    if (searchObject.mail === '')
      this.searchObject.mail = null;
  }
}
