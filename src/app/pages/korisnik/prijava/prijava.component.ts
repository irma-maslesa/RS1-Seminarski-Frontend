import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../../shared/rest-api.service';
import { KorisnikPrijava } from '../shared/korisnik-prijava.model';

@Component({
  selector: 'prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})
export class PrijavaComponent implements OnInit {
  korisnik:KorisnikPrijava = new KorisnikPrijava();
  constructor(
    private api: RestApiService,
    private router: Router) { }

  ngOnInit(): void {
  }

  prijava(){
    console.log(this.korisnik);
  }

  ocisti(){
    this.ngOnInit();
  }
}
