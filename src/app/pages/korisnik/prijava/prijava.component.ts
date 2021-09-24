import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../../shared/rest-api.service';
import { KorisnikPrijava } from '../shared/korisnik-prijava.model';
import { KorisnikApi } from '../shared/liga-api.constant';


import data from './../../../../assets/config/menu.json';

@Component({
  selector: 'prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})
export class PrijavaComponent implements OnInit {
  korisnik: KorisnikPrijava = new KorisnikPrijava();
  constructor(
    private api: RestApiService,
    private router: Router) { }

  ngOnInit(): void {
  }

  prijava() {
    this.api.post(KorisnikApi.KORISNIK_PRIJAVA, this.korisnik).subscribe(
      (response) => {
        localStorage.setItem("token", response.token);
        localStorage.setItem("uloga", response.token);
      })
  }

  ocisti() {
    this.ngOnInit();
  }
}
