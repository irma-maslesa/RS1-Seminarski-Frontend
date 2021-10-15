import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from '../../shared/rest-api.service';
import { Uloga } from '../../shared/uloga.constant';
import { StatistikaApi } from '../shared/statistika-api.constant';
import { Statistika } from '../shared/statistika.model';
import { StatistikaKlub } from '../statistika-klub/shared/statistika-klub.model';

@Component({
    selector: 'statistika-overview',
    templateUrl: './statistika-overview.component.html',
    styleUrls: ['./statistika-overview.component.scss']
})
export class StatistikaOverviewComponent implements OnInit {
    statistika;

    imageSrcBase: string = "https://api.p2036.app.fit.ba";

    uloga = Uloga.GOST;

    constructor(private route: ActivatedRoute,
        private api: RestApiService,
        private router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {
        if (sessionStorage.getItem("korisnik") || localStorage.getItem("korisnik")) {
            var korisnik = JSON.parse(sessionStorage.getItem("korisnik"));
      
            if(korisnik == null)
              korisnik = JSON.parse(localStorage.getItem("korisnik"));
      
            this.uloga = korisnik.uloga;
          }

        this.getData();
    }

    getData() {
        const id = +this.route.snapshot.paramMap.get('id');

        this.api.get(StatistikaApi.GET_STATISTIKA_BY_UTAKMICA_ID.replace('#', id.toString())).subscribe(
            (response: Statistika) => {
                if (response) {
                    this.statistika = response;
                }
            }
        )
    }
}
