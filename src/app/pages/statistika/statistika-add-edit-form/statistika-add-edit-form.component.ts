import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IgracApi } from '../../igrac/shared/igrac-api.constant';
import { IgracSimple } from '../../igrac/shared/igrac-simple.model';
import { RestApiService } from '../../shared/rest-api.service';
import { Uloga } from '../../shared/uloga.constant';
import { UtakmicaApi } from '../../utakmica/shared/utakmica-api.constant';
import { Utakmica } from '../../utakmica/shared/utakmica.model';
import { StatistikaApi } from '../shared/statistika-api.constant';
import { StatistkaCreate } from '../shared/statistika-create.model';
import { StatistikaIgracCreate } from '../statistika-igrac/shared/statistika-igrac-create.model';
import { StatistikaKlubCreate } from '../statistika-klub/shared/statistika-klub-create.model';


@Component({
    selector: 'statistika-add-edit-form',
    templateUrl: './statistika-add-edit-form.component.html',
    styleUrls: ['./statistika-add-edit-form.component.scss']
})
export class StatistikaAddEditFormComponent implements OnInit {
    statistikaCreate = new StatistkaCreate();

    @ViewChild('domacin') domacinStatistika;
    @ViewChild('gost') gostStatistika;
    @ViewChild('domacinStat') domaciIgraciStat;
    @ViewChild('gostStat') gostujuciIgraciStat;

    utakmica: Utakmica = new Utakmica();

    domaciIgraciMapa: Map<number, StatistikaIgracCreate> = new Map<number, StatistikaIgracCreate>();
    domaciIgraci: IgracSimple[] = [];
    domaciIgraciStatistika: StatistikaIgracCreate[] = [];

    gostujuciIgraciMapa: Map<number, StatistikaIgracCreate> = new Map<number, StatistikaIgracCreate>();
    gostujuciIgraci: IgracSimple[] = [];
    gostujuciIgraciStatistika: StatistikaIgracCreate[] = [];

    imageSrcBase: string = "https://api.p2036.app.fit.ba";

    uloga = Uloga.GOST;

    constructor(private route: ActivatedRoute, private api: RestApiService, private router: Router, private toastr: ToastrService, private matDialog: MatDialog) { }

    ngOnInit() {
        if (sessionStorage.getItem("korisnik") || localStorage.getItem("korisnik")) {
            var korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
      
            if(korisnik == null)
              korisnik = JSON.parse(localStorage.getItem("korisnik"));
      
            this.uloga = korisnik.uloga;
          }

        this.getData();
        this.toastr.info("Nepopunjena polja imaju vrijednost nula!", null, { positionClass: 'toast-bottom-right', closeButton: true, disableTimeOut: true })
    }

    getData() {
        const id = +this.route.snapshot.paramMap.get('id');
        this.statistikaCreate.utakmicaID = id;

        this.api.get(UtakmicaApi.GET_UTAKMICA_BY_ID.replace('#', id.toString())).subscribe(
            (utakmica: Utakmica) => {
                if (utakmica) {
                    this.utakmica = utakmica;

                    let params = new HttpParams();
                    params = params.set('KlubID', utakmica.klubDomacinID.toString());
                    let options = { params: params }
                    this.api.get(IgracApi.GET_IGRAC, options).subscribe(
                        response => {
                            if (response) {
                                this.domaciIgraci = response;

                                for (let igrac of this.domaciIgraci) {
                                    let stat = new StatistikaIgracCreate();
                                    stat.IgracId = igrac.id;
                                    this.domaciIgraciStatistika.push(stat);

                                    this.domaciIgraciMapa.set(igrac.id, stat);
                                }
                            }
                        }
                    )

                    params = params.set('KlubID', utakmica.klubGostID.toString());
                    options = { params: params }
                    this.api.get(IgracApi.GET_IGRAC, options).subscribe(
                        response => {
                            if (response) {
                                this.gostujuciIgraci = response;

                                for (let igrac of this.gostujuciIgraci) {
                                    let stat = new StatistikaIgracCreate();
                                    stat.IgracId = igrac.id;
                                    this.gostujuciIgraciStatistika.push(stat);

                                    this.gostujuciIgraciMapa.set(igrac.id, stat);
                                }
                            }
                        }
                    )
                }
            }
        )


    }

    createLink(params) {
        var span = document.createElement('span');
        span.innerHTML = `<p> ${params.value} </p> `;
        span.addEventListener('click', () => {
            this.router.navigateByUrl('/' + params.colDef.headerName.toLowerCase() + '/' + params.data.id + '/information');
        });
        return span;
    }

    save() {
        this.statistikaCreate.rezultatDomacin = this.statistikaCreate.rezultatDomacin ? this.statistikaCreate.rezultatDomacin : 0
        this.statistikaCreate.rezultatGost = this.statistikaCreate.rezultatGost ? this.statistikaCreate.rezultatGost : 0

        this.handleNullsKlub(this.domacinStatistika.statistika);
        this.domacinStatistika.statistika.KlubId = this.utakmica.klubDomacinID;
        this.handleNullsKlub(this.gostStatistika.statistika);
        this.gostStatistika.statistika.KlubId = this.utakmica.klubGostID;

        this.domaciIgraciStat.igraciStat.forEach(element => {
            this.handleNullsIgrac(element);
        });
        this.gostujuciIgraciStat.igraciStat.forEach(element => {
            this.handleNullsIgrac(element);
        });

        this.statistikaCreate.statistikaDomacin = this.domacinStatistika.statistika;
        this.statistikaCreate.statistikaGost = this.gostStatistika.statistika;
        this.statistikaCreate.statistikaDomaciIgraci = Array.from(this.domaciIgraciStat.igraciStat.values());
        this.statistikaCreate.statistikaGostujuciIgraci = Array.from(this.gostujuciIgraciStat.igraciStat.values());

        this.api.post(StatistikaApi.CREATE_STATISTIKA, this.statistikaCreate).subscribe((response) => {
            if (response) {
                this.toastr.success("Statistika za utakmicu uspješno ažurirana!");
                this.router.navigateByUrl("utakmicaA")
            }
        })
    }

    handleNullsKlub(statistika: StatistikaKlubCreate) {
        statistika.Dodavanja = statistika.Dodavanja ? statistika.Dodavanja : 0;
        statistika.Korneri = statistika.Korneri ? statistika.Korneri : 0;
        statistika.Napadi = statistika.Napadi ? statistika.Napadi : 0;
        statistika.NapadiOpasni = statistika.NapadiOpasni ? statistika.NapadiOpasni : 0;
        statistika.Odbrane = statistika.Odbrane ? statistika.Odbrane : 0;
        statistika.Ofsajdi = statistika.Ofsajdi ? statistika.Ofsajdi : 0;
        statistika.Posjed = statistika.Posjed ? statistika.Posjed : 0;
        statistika.Prekrsaji = statistika.Prekrsaji ? statistika.Prekrsaji : 0;
        statistika.SuteviBlokirani = statistika.SuteviBlokirani ? statistika.SuteviBlokirani : 0;
        statistika.SuteviOkvir = statistika.SuteviOkvir ? statistika.SuteviOkvir : 0;
        statistika.SuteviVanOkvira = statistika.SuteviVanOkvira ? statistika.SuteviVanOkvira : 0;
        statistika.Uklizavanja = statistika.Uklizavanja ? statistika.Uklizavanja : 0;
    }

    handleNullsIgrac(statistika: StatistikaIgracCreate) {
        statistika.Asistencije = statistika.Asistencije ? statistika.Asistencije : 0;
        statistika.BrojMinuta = statistika.BrojMinuta ? statistika.BrojMinuta : 0;
        statistika.CrveniKarton = statistika.CrveniKarton ? statistika.CrveniKarton : 0;
        statistika.Golovi = statistika.Golovi ? statistika.Golovi : 0;
        statistika.ZutiKarton = statistika.ZutiKarton ? statistika.ZutiKarton : 0;
    }
}
