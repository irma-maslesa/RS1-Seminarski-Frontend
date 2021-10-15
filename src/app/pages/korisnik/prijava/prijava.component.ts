import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from '../../shared/rest-api.service';
import { Uloga } from '../../shared/uloga.constant';
import { KorisnikApi } from '../shared/korisnik-api.constant';
import { KorisnikPrijava } from '../shared/korisnik-prijava.model';

@Component({
  selector: 'prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})
export class PrijavaComponent implements OnInit {
  korisnik: KorisnikPrijava = new KorisnikPrijava();
  constructor(
    private api: RestApiService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  prijava() {
    this.api.post(KorisnikApi.KORISNIK_PRIJAVA, this.korisnik).subscribe(
      (response) => {
        sessionStorage.setItem("korisnik", JSON.stringify(response));
        if (response.zapamtiMe) {
          localStorage.setItem("korisnik", JSON.stringify(response));
        }
        this.toastr.info(`Dobrodošli, ${response.ime} ${response.prezime}!`);
        if (response.uloga == Uloga.ADMINISTRATOR_UTAKMICA)
          this.router.navigateByUrl('utakmica');
        else if (response.uloga == Uloga.ADMINISTRATOR_KLUBOVA)
          this.router.navigateByUrl('klubb');
        else
          this.router.navigateByUrl('');



      })
  }

  ocisti() {
    this.ngOnInit();
  }
}
