import { Component } from '@angular/core';

@Component({
  selector: 'trener-search',
  templateUrl: './trener-search.component.html',
  styleUrls: ['./trener-search.component.scss']
})
export class TrenerSearchComponent {

  searchObject;

  submit(searchObject) {
    console.log("Tu sam");
    this.searchObject = searchObject;

    if (searchObject.ime === '')
      this.searchObject.ime = null;
    if (searchObject.prezime === '')
      this.searchObject.prezime = null;
    if (searchObject.mail === '')
      this.searchObject.mail = null;
  }
}
