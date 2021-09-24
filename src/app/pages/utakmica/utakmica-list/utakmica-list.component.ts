import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { UtakmicaApi } from '../shared/utakmica-api.constant';
import { Utakmica } from '../shared/utakmica.model';

@Component({
  selector: 'utakmica-list',
  templateUrl: './utakmica-list.component.html',
  styleUrls: ['./utakmica-list.component.scss']
})
export class UtakmicaListComponent implements OnInit, OnChanges {
  @Output() clickEmitter = new EventEmitter();
  @Input() searchObject;

  utakmicaList: Utakmica[] = [];

  constructor(
    private api: RestApiService) { }

  ngOnInit(): void {
    this.getUtakmice(this.searchObject);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.searchObject);
    var currentObject = changes.searchObject;

    if (!currentObject.firstChange) {
      var searchObject = currentObject.currentValue;

      this.getUtakmice(searchObject);
    }
  }

  private getUtakmice(searchObject: any) {
    var params = new HttpParams();
    params = searchObject?.KlubDomacinId ? params.set('KlubDomacinId', searchObject.KlubDomacinId) : params;
    params = searchObject?.KlubGostId ? params.set('KlubGostId', searchObject.KlubGostId) : params;
    params = searchObject?.SezonaId ? params.set('SezonaId', searchObject.SezonaId) : params;

    var options = { params: params };
    this.api.get(UtakmicaApi.GET_UTAKMICA, options)
      .subscribe((response) => {
        this.utakmicaList = response;
      });
  }
}