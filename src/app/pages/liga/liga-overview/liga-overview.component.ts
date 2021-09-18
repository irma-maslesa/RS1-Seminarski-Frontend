import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoV } from '../../shared/LoV.model';
import { RestApiService } from '../../shared/rest-api.service';
import { LigaApi } from '../shared/liga-api.constant';

@Component({
  selector: 'liga-overview',
  templateUrl: './liga-overview.component.html',
  styleUrls: ['./liga-overview.component.scss']
})
export class LigaOverviewComponent implements OnInit {
  liga: LoV;
  searchObjectKlubSezona: any = {};
  utakmica = false;

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

  }

  handleClick(sezonaId){
    this.utakmica = true;
    console.log(sezonaId);
  }
}
