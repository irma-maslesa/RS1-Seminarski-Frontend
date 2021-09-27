import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../../shared/rest-api.service';
import { KorisnikApi } from '../shared/liga-api.constant';


@Component({
  selector: 'odjava',
  template: ''
})
export class OdjavaComponent implements OnInit {
  constructor(
    private api: RestApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.api.post(KorisnikApi.KORISNIK_ODJAVA).subscribe(
      (response) => {
        localStorage.removeItem("korisnik");
        this.router.navigateByUrl('prijava');
      })
  }
}