import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IgracApi } from '../../igrac/shared/igrac-api.constant';
import { Igrac } from '../../igrac/shared/igrac.model';
import { RestApiService } from '../../shared/rest-api.service';
import { Uloga } from '../../shared/uloga.constant';
import { StadionApi } from '../../stadion/shared/stadion-api.constant';
import { Stadion } from '../../stadion/shared/stadion.model';
import { StatistikaApi } from '../../statistika/shared/statistika-api.constant';
import { StatistikaSezonaKlub } from '../../statistika/statistika-klub/shared/statistika-sezona-klub.model';
import { TrenerApi } from '../../trener/shared/trener-api.constant';
import { Trener } from '../../trener/shared/trener.model';
import { KlubApi } from '../shared/klub-api.constant';
import { Klub } from '../shared/klub.model';

@Component({
    selector: 'klub-overview',
    templateUrl: './klub-overview.component.html',
    styleUrls: ['./klub-overview.component.scss']
})
export class KlubOverviewComponent implements OnInit {
    klub: Klub;
    id: number;
    trener: Trener;
    stadion: Stadion;
    imageSrcBase: string = "https://api.p2036.app.fit.ba";

    uloga = Uloga.GOST;

    searchObjectRezultati = {};
    searchObjectRaspored = {};
    searchObjectTrenutne = {};

    imaTrenutne = true;

    igraci: Igrac[] = [];
    sezone: StatistikaSezonaKlub[] = [];

    showCharts = false;
    chartStats: StatistikaSezonaKlub;
    selectedTab: number = 0;

    constructor(private route: ActivatedRoute,
        private api: RestApiService,
        private router: Router,
        private toastr: ToastrService) {

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.getData();

        this.api.get(StatistikaApi.GET_STATISTIKA_SEZONA_BY_KLUB.replace("#", this.id.toString())).subscribe(
            (response: StatistikaSezonaKlub[]) => {
                if (response) {
                    this.sezone = response;
                }
            }
        )
    }

    getData() {
        this.api.get(KlubApi.GET_KLUB_BY_ID.replace('#', this.id.toString())).subscribe(
            klub => {
                if (klub) {
                    this.klub = klub;

                    let params = new HttpParams();
                    params = params.set("klubId", this.klub.id.toString());

                    this.api.get(IgracApi.GET_IGRAC_BY_KLUB_ID, { params: params })
                        .subscribe(response => {
                            if (response) {
                                this.igraci = response;
                            }
                        });
                }
            },
            () => { },
            () => {
                this.searchObjectRezultati = {
                    KlubId: this.klub.id,
                    Status: 'ZAVRSENA'
                }

                this.searchObjectRaspored = {
                    KlubId: this.klub.id,
                    Status: 'PREDSTOJECA'
                }
                this.searchObjectTrenutne = {
                    KlubId: this.klub.id,
                    Status: 'U TOKU'
                }

                if (this.klub.trenerID)
                    this.api.get(TrenerApi.GET_TRENER_BY_ID.replace('#', this.klub.trenerID.toString()))
                        .subscribe(trener => {
                            if (trener) {
                                this.trener = trener;
                            }
                        })

                this.api.get(StadionApi.GET_STADION_BY_ID.replace('#', this.klub.stadionID.toString()))
                    .subscribe(stadion => {
                        if (stadion) {
                            this.stadion = stadion;
                        }
                    })
            }
        )
    }

    hideTrenutne() {
        this.imaTrenutne = false;
    }

    prikaziGrafove(statistika: StatistikaSezonaKlub) {
        if (statistika.pobjeda == 0 && statistika.poraz == 0 && statistika.remi == 0 &&
            statistika.postignutiGolovi == 0 && statistika.primljeniGolovi == 0) {
            this.showCharts = false;
            this.toastr.info("Nema dovoljno podataka za prikaz grafova sezone " + statistika.sezona + "!");
        }
        else {
            this.chartStats = statistika;
            this.showCharts = true;
            this.selectedTab = 1;
        }
    }

    changeSelectedIndex(selectedTab) {
        if (selectedTab == 0) {
            this.showCharts = false;
        }

        this.selectedTab = selectedTab;
    }
}
