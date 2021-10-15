import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiService } from '../../shared/rest-api.service';
import { Uloga } from '../../shared/uloga.constant';
import { LigaApi } from '../shared/liga-api.constant';
import { Liga } from '../shared/liga.model';

@Component({
  selector: 'liga-overview',
  templateUrl: './liga-overview.component.html',
  styleUrls: ['./liga-overview.component.scss']
})
export class LigaOverviewComponent implements OnInit {
  liga: Liga;
  searchObjectKlubSezona: any = {};
  searchObjectUtakmicaSezona: any = {};
  utakmica = false;

  uloga = Uloga.GOST;
  prikaziPoredak = true;

  imaPoredak:boolean = true;

  constructor(
    private route: ActivatedRoute,
    private api: RestApiService) { }


  ngOnInit(): void {
    if (sessionStorage.getItem("korisnik") || localStorage.getItem("korisnik")) {
      var korisnik = JSON.parse(sessionStorage.getItem("korisnik"));

      if(korisnik == null)
        korisnik = JSON.parse(localStorage.getItem("korisnik"));

      this.uloga = korisnik.uloga;
    }

    this.searchObjectKlubSezona.ligaId = +this.route.snapshot.paramMap.get('id');

    this.api.get(LigaApi.GET_LIGA_BY_ID.replace('#', this.route.snapshot.paramMap.get('id'))).subscribe((response) => {
      this.liga = response;
    })
  }

  handleClick(sezonaId) {
    this.utakmica = true;
    this.searchObjectUtakmicaSezona = { SezonaIds: [sezonaId] };
  }

  hidePoredak(){
    this.prikaziPoredak = false
  }

  setImaPoredak(){
    this.imaPoredak = false;
  }
}
