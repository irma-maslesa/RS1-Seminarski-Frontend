import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Uloga } from '../../shared/uloga.constant';

@Component({
  selector: 'klub-search',
  templateUrl: './klub-search.component.html',
  styleUrls: ['./klub-search.component.scss']
})
export class KlubSearchComponent implements OnInit {
  uloga = Uloga.GOST;

  searchObject;

  ngOnInit(): void {
    if (sessionStorage.getItem("korisnik") || localStorage.getItem("korisnik")) {
      var korisnik = JSON.parse(sessionStorage.getItem("korisnik"));

      if(korisnik == null)
        korisnik = JSON.parse(localStorage.getItem("korisnik"));

      this.uloga = korisnik.uloga;
    }
  }
  submit(searchObject) {
    this.searchObject = searchObject;

    if (searchObject.naziv === '')
      this.searchObject.ime = null;
  }
}
