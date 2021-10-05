import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from '../../shared/rest-api.service';
import { Uloga } from '../../shared/uloga.constant';
import { StadionApi } from '../../stadion/shared/stadion-api.constant';
import { Stadion } from '../../stadion/shared/stadion.model';
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
    klub: Klub = new Klub();
    trener: Trener;
    stadion: Stadion;
    imageSrcBase: string = "https://api.p2036.app.fit.ba";

    uloga = Uloga.GOST;

    searchObjectRezultati = {};
    searchObjectRaspored = {};
    searchObjectTrenutne = {};

    imaTrenutne = true;

    constructor(private route: ActivatedRoute, private api: RestApiService, private router: Router, private toastr: ToastrService, private matDialog: MatDialog) { }

    ngOnInit() {
        this.getData();
    }

    getData() {
        const id = +this.route.snapshot.paramMap.get('id');

        this.api.get(KlubApi.GET_KLUB_BY_ID.replace('#', id.toString())).subscribe(
            klub => {
                if (klub) {
                    console.log(klub);
                    this.klub = klub;
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

    createLink(params) {
        var span = document.createElement('span');
        span.innerHTML = `<p> ${params.value} </p> `;
        span.addEventListener('click', () => {
            this.router.navigateByUrl('/' + params.colDef.headerName.toLowerCase() + '/' + params.data.id + '/information');
        });
        return span;
    }

    hideTrenutne(){
        console.log("HERE");
        this.imaTrenutne = false;
    }
}
