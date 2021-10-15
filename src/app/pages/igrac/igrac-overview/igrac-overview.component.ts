import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../shared/rest-api.service';
import { Uloga } from '../../shared/uloga.constant';
import { StatistikaApi } from '../../statistika/shared/statistika-api.constant';
import { StatistikaSezonaIgrac } from '../../statistika/statistika-igrac/shared/statistika-sezona-igrac.model';
import { StatistikaIgracUtakmica } from '../../statistika/statistika-igrac/shared/statistika-igrac-utakmica.model';
import { IgracApi } from '../shared/igrac-api.constant';
import { IgracSimple } from '../shared/igrac-simple.model';

@Component({
    selector: 'igrac-overview',
    templateUrl: './igrac-overview.component.html',
    styleUrls: ['./igrac-overview.component.scss']
})
export class IgracOverviewComponent implements OnInit {
    igrac: IgracSimple;
    id = null;

    uloga = Uloga.GOST;

    utakmice: StatistikaIgracUtakmica[] = [];
    sezone: StatistikaSezonaIgrac[] = [];

    pageNumber = 0;
    pageSize = 5;

    constructor(private route: ActivatedRoute,
        private api: RestApiService,
        private router: Router) {
    }

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.id = +this.route.snapshot.paramMap.get('id');

        this.api.get(IgracApi.GET_IGRAC_BY_ID.replace('#', this.id.toString())).subscribe(
            (response: IgracSimple) => {
                if (response) {
                    this.igrac = response;
                }
            }
        )

        this.getUtakmice();

        this.api.get(StatistikaApi.GET_STATISTIKA_SEZONA_BY_IGRAC.replace("#", this.id.toString())).subscribe(
            (response: StatistikaSezonaIgrac[]) => {
                if (response) {
                    this.sezone = response;
                }
            }
        )

    }

    getUtakmice(event = null) {
        let params = new HttpParams();
        params = params.set('pageNumber', (this.pageNumber + 1).toString()).set('pageSize', this.pageSize.toString());
        this.api.get(StatistikaApi.GET_STATISTIKA_UTAKMICA_BY_IGRAC.replace("#", this.id.toString()), { params: params }).subscribe(
            (response: StatistikaIgracUtakmica[]) => {
                if (response) {
                    this.utakmice = this.utakmice.concat(response);
                    this.pageNumber += 1;

                    params = params.set('pageNumber', (this.pageNumber + 1).toString()).set('pageSize', this.pageSize.toString());
                    
                    this.api.get(StatistikaApi.GET_STATISTIKA_UTAKMICA_BY_IGRAC.replace("#", this.id.toString()), { params: params }).subscribe(
                        (response: StatistikaIgracUtakmica[]) => {
                            if (response.length != 0) {
                                if (event) {
                                    event.target.style.display = "block";
                                }
                                else{
                                    document.getElementById("more-button").style.display ="block"
                                }
                            }
                            else{
                                if (event) {
                                    event.target.style.display = "none";
                                }
                                else{
                                    document.getElementById("more-button").style.display ="none"
                                }
                            }
                        }
                    );
                }
            }
        );
    }
}
