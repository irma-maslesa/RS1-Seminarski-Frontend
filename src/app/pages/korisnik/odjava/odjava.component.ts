import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../../shared/rest-api.service';
import { KorisnikPrijava } from '../shared/korisnik-prijava.model';
import { KorisnikApi } from '../shared/liga-api.constant';


@Component({
  selector: 'odjava'
})
export class OdjavaComponent implements OnInit {
  constructor(
    private api: RestApiService,
    private router: Router) { }

  ngOnInit(): void {
  }

  odjava() {
    this.api.post(KorisnikApi.KORISNIK_ODJAVA).subscribe(
      (response) => {
        console.log(response);
        localStorage.removeItem("token");
        localStorage.removeItem("uloga");
      })
  }

  ocisti() {
    this.ngOnInit();
  }
}
