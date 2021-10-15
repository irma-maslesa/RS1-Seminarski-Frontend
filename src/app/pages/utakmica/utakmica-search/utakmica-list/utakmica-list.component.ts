import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KorisnikApi } from 'src/app/pages/korisnik/shared/korisnik-api.constant';
import { KorisnikOmiljenaUtakmica } from 'src/app/pages/korisnik/shared/korisnik-omiljena-utakmica.model';
import { LigaApi } from 'src/app/pages/liga/shared/liga-api.constant';
import { Liga } from 'src/app/pages/liga/shared/liga.model';
import { SezonaApi } from 'src/app/pages/sezona/shared/sezona-api.constant';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { Uloga } from 'src/app/pages/shared/uloga.constant';
import { UtakmicaApi } from '../../shared/utakmica-api.constant';
import { Utakmica } from '../../shared/utakmica.model';

@Component({
  selector: 'utakmica-list',
  templateUrl: './utakmica-list.component.html',
  styleUrls: ['./utakmica-list.component.scss']
})
export class UtakmicaListComponent implements OnInit, OnChanges {
  @Output() clickEmitter = new EventEmitter();
  @Output() nemaUtakmiceEmitter = new EventEmitter();
  @Input() searchObject = {
    Status: null,
    StadionId: null,
    KlubId: null,
    KlubDomacinId: null,
    KlubGostId: null,
    SezonaIds: null,
    Analitika: null
  }

  @Input() ligaFilter = true;
  @Input() statusFilter = true;

  uloga = Uloga.GOST;
  uloge = Uloga;

  imageSrcBase: string = "https://localhost:5001";

  utakmicaList: Utakmica[] = [];
  ligaList: Liga[] = [];

  omiljeneUtakmice: Utakmica[] = [];
  omiljeneUtakmiceIds: number[] = [];

  saStatistikomIds: number[] = [];

  omiljene: boolean = false;
  @Input() rezultati: boolean = false;
  @Input() predstojece: boolean = false;

  constructor(
    private api: RestApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if (sessionStorage.getItem("korisnik") || localStorage.getItem("korisnik")) {
        var korisnik = JSON.parse(sessionStorage.getItem("korisnik"));

        if (korisnik == null)
          korisnik = JSON.parse(localStorage.getItem("korisnik"));

        this.uloga = korisnik.uloga;
      }
      if (data != null && data.omiljene != null && data.omiljene) {
        this.omiljene = true;
        this.getOmiljeneUtakmice();
        this.utakmicaList = this.omiljeneUtakmice;
      }
      else {
        if ((this.uloga == Uloga.KORISNIK || this.uloga == Uloga.GOST) &&
          (this.searchObject == null || this.searchObject.SezonaIds == null ||
            this.searchObject.SezonaIds.length == 0))
          this.getUtakmiceTrenutneSezone();
        else if (this.uloga == Uloga.ANALITICAR && !this.rezultati) {
          if (this.searchObject) {
            this.searchObject.Status = 'ZAVRSENA';
          }
          else
            this.searchObject = {
              StadionId: null,
              KlubId: null,
              KlubDomacinId: null,
              KlubGostId: null,
              SezonaIds: null,
              Analitika: null,
              Status: 'ZAVRSENA'
            };
          this.getUtakmiceTrenutneSezone();
        }
        else
          this.getUtakmice(this.searchObject);
      }
    });

    if (this.uloga == Uloga.KORISNIK)
      this.getOmiljeneUtakmice();

    this.getLige();

    let params = new HttpParams();
    params = params.set('Analitika', "true");
    this.api.get(UtakmicaApi.GET_UTAKMICA, { params: params }).subscribe((response: Utakmica[]) => {
      if (response)
        this.saStatistikomIds = response.map(e => e.id);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    var currentObject = changes.searchObject;

    if (!currentObject.firstChange) {
      var searchObject = currentObject.currentValue;

      this.getUtakmice(searchObject);
    }
  }

  private getUtakmice(searchObject: any) {
    var params = new HttpParams();
    params = searchObject?.Status ? params.set('Status', searchObject.Status) : params;
    params = searchObject?.StadionId ? params.set('StadionId', searchObject.StadionId) : params;
    params = searchObject?.KlubId ? params.set('KlubId', searchObject.KlubId) : params;
    params = searchObject?.KlubDomacinId ? params.set('KlubDomacinId', searchObject.KlubDomacinId) : params;
    params = searchObject?.KlubGostId ? params.set('KlubGostId', searchObject.KlubGostId) : params;
    params = searchObject?.Analitika != null ? params.set('Analitika', searchObject.Analitika) : params;

    if (searchObject?.SezonaIds != null)
      for (let sezonaId of searchObject.SezonaIds)
        params = params.append("SezonaIds", sezonaId.toString());

    var options = { params: params };
    this.api.get(UtakmicaApi.GET_UTAKMICA, options)
      .subscribe((response) => {
        this.utakmicaList = response;
      }, () => { }, () => {
        if (this.utakmicaList.length == 0) {
          this.nemaUtakmiceEmitter.emit();
        }
      });
  }

  private setActiveButton(className: any, event: any = null) {
    let elements = document.getElementsByClassName(className);
    if (elements[0]) {
      elements = elements[0].children;
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('btn-secondary');
        elements[i].classList.add('btn-outline-secondary');
      }

      if (event) {
        event.target.classList.add('btn-secondary');
        event.target.classList.remove('btn-outline-secondary');
      }
      else {
        elements[0].classList.add('btn-secondary');
        elements[0].classList.remove('btn-outline-secondary');
      }
    }
  }

  private getUtakmiceTrenutneSezone() {
    var sezonaIds: number[] = [-1];
    var params = new HttpParams();

    params = params.set('DatumPocetka', new Date().toLocaleString())
      .set('DatumZavrsetka', new Date().toLocaleString());

    var options = { params: params };

    this.api.get(SezonaApi.GET_SEZONA, options)
      .subscribe((response) => {
        if (response.length > 0) {
          sezonaIds = null;
          sezonaIds = response.map(r => r.id);
        }
      }, () => { }, () => {
        if (this.searchObject) {
          this.searchObject.SezonaIds = sezonaIds;
          this.getUtakmice(this.searchObject);
        }

        else
          this.getUtakmice({ SezonaIds: sezonaIds });
      });
  }

  getOmiljeneUtakmice() {
    this.api.get(KorisnikApi.GET_OMILJENE_UTAKMICE.replace('#', JSON.parse(sessionStorage.getItem("korisnik")).id))
      .subscribe((response) => {
        this.omiljeneUtakmice = response;
        this.omiljeneUtakmiceIds = this.omiljeneUtakmice.map(u => u.id);

        if (this.omiljene)
          this.utakmicaList = response;
      });
  }

  getLige() {
    this.api.get(LigaApi.GET_LIGA)
      .subscribe((response) => {
        this.ligaList = response;
      });
  }

  edit(id = 0) {
    if (id != 0)
      console.log("EDIT", id);
    else
      console.log("CREATE");
  }

  delete(id) {
    console.log("DELETE", id);
  }

  filter(event, status: string) {
    if (this.searchObject)
      this.searchObject.Status = status;
    else
      this.searchObject = {
        Status: status,
        StadionId: null,
        KlubId: null,
        KlubDomacinId: null,
        KlubGostId: null,
        SezonaIds: null,
        Analitika: null
      }

    this.getUtakmice(this.searchObject);
    this.setActiveButton("buttons", event);
  }

  filterLiga(event, id: number = null) {
    if (id == null) {

      this.setActiveButton("buttons");
      this.getUtakmiceTrenutneSezone();
    }

    else {
      var sezonaId: number = -1;
      var params = new HttpParams();
      params = params.set('DatumPocetka', new Date().toLocaleString())
        .set('DatumZavrsetka', new Date().toLocaleString())
        .set('LigaId', id.toString());

      var options = { params: params };

      this.api.get(SezonaApi.GET_SEZONA, options)
        .subscribe((response) => {
          if (response.length > 0) {
            sezonaId = response[0].id;
          }
        }, () => { }, () => {
          if (this.searchObject)
            this.searchObject.SezonaIds = [sezonaId];
          else
            this.searchObject = {
              Status: null,
              StadionId: null,
              KlubId: null,
              KlubDomacinId: null,
              KlubGostId: null,
              SezonaIds: [sezonaId],
              Analitika: null
            }
          this.getUtakmice(this.searchObject);

          this.setActiveButton("buttons-liga", event);
        });
    }
  }

  filterAnalitika(event, analitika: boolean = null) {
    if (this.searchObject != null) {
      this.searchObject.Status = 'ZAVRSENA';
      this.searchObject.Analitika = analitika;
    }
    else {
      this.searchObject = {
        Status: 'ZAVRSENA',
        StadionId: null,
        KlubId: null,
        KlubDomacinId: null,
        KlubGostId: null,
        SezonaIds: null,
        Analitika: analitika
      }
    }
    
    this.getUtakmice(this.searchObject);
    this.setActiveButton("buttons-analitika", event);
  }

  dodajOmiljenu(utakmicaId) {
    let korisnikOmiljenaUtakmica = new KorisnikOmiljenaUtakmica();
    korisnikOmiljenaUtakmica.korisnikId = JSON.parse(sessionStorage.getItem("korisnik")).id;
    korisnikOmiljenaUtakmica.utakmicaID = utakmicaId;

    this.api.post(KorisnikApi.OMILJENE_UTAKMICE, korisnikOmiljenaUtakmica)
      .subscribe((response) => {
        this.omiljeneUtakmice = response;
        this.omiljeneUtakmiceIds = this.omiljeneUtakmice.map(u => u.id);

        if (this.omiljene)
          this.utakmicaList = response;
      });
  }

  ukloniOmiljenu(utakmicaId) {

    var params = new HttpParams();

    var korisnik = JSON.parse(sessionStorage.getItem("korisnik"));

    if (korisnik == null)
      korisnik = JSON.parse(localStorage.getItem("korisnik"));

    params = params.set('korisnikId', korisnik.id)
      .set('utakmicaID', utakmicaId);

    var options = { params: params };

    this.api.delete(KorisnikApi.OMILJENE_UTAKMICE, options)
      .subscribe((response) => {
        this.omiljeneUtakmice = response;
        this.omiljeneUtakmiceIds = this.omiljeneUtakmice.map(u => u.id);

        if (this.omiljene)
          this.utakmicaList = response;
      });
  }

  handleClick(id) {
    this.router.navigateByUrl(`utakmica/${id}`);
  }

  handleClickKlub(id) {
    this.router.navigateByUrl(`klub/${id}`);
  }

  handleDodajStatistiku(id) {
    this.router.navigateByUrl(`utakmica/${id}/statistika`);
  }
}