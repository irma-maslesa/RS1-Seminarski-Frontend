import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from '../../shared/rest-api.service';
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
  show = false;

  constructor(
    private route: ActivatedRoute,
    private api: RestApiService,
    private router: Router,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.searchObjectKlubSezona.ligaId = +this.route.snapshot.paramMap.get('id');

    this.api.get(LigaApi.GET_LIGA_BY_ID.replace('#', this.route.snapshot.paramMap.get('id'))).subscribe((response) => {
      this.liga = response;
    })

    if(history.state.show){
      this.show = history.state.show;
    }
  }

  handleClick(sezonaId) {
    this.utakmica = true;
    this.searchObjectUtakmicaSezona = { SezonaId: sezonaId };
  }
}
