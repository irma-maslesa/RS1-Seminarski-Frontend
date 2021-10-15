import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../../shared/rest-api.service';
import { UtakmicaSimple } from '../../utakmica/shared/utakmica-simple.model';
import { KlubApi } from '../shared/klub-api.constant';
import { KlubPoredak } from '../shared/klub-poredak.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'klub-poredak',
  templateUrl: './klub-poredak.component.html',
  styleUrls: ['./klub-poredak.component.scss']
})
export class KlubPoredakComponent implements OnInit {
  @Input() klubId = null;
  @Input() ligaId = null;

  @Output() nemaPoredak = new EventEmitter();

  klubovi: KlubPoredak[] = [];

  imageSrcBase: string = "https://api.p2036.app.fit.ba";

  constructor(private api: RestApiService, private datepipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.klubId == null ?
      this.getDataByLiga() :
      this.getDataByKlub();
  }

  getDataByKlub() {
    let params = new HttpParams()
    params = params.set("klubId", this.klubId).set("ligaId", "0");
    this.api.get(KlubApi.GET_POREDAK, { params: params }).subscribe(
      (response: KlubPoredak[]) => {
        if (response && response.length) {
          this.klubovi = response;
        }
        else {
          this.klubovi = null;
          this.nemaPoredak.emit();
        }
      });
  }
  getDataByLiga() {
    let params = new HttpParams()
    params = params.set("ligaId", this.ligaId).set("klubId", "0");
    this.api.get(KlubApi.GET_POREDAK, { params: params }).subscribe(
      (response: KlubPoredak[]) => {
        if (response && response.length) {
          this.klubovi = response;
        }
        else {
          this.klubovi = null;
          this.nemaPoredak.emit();
        }
      });
  }

  generateTitleIduca(utakmica: UtakmicaSimple) {
    if (utakmica)
      return `Iduća utakmica:\n${utakmica.klubDomacinNaziv} - ${utakmica.klubGostNaziv}\n${this.datepipe.transform(utakmica.datumOdrzavanja, 'dd.MM.yyyy., hh:mm')}`
    else
      return "Nema najavljenih utakmica"
  }

  generateTitlePrethodna(utakmica: UtakmicaSimple) {
    return `${utakmica.rezultatDomacin} - ${utakmica.rezultatGost} (${utakmica.klubDomacinNaziv} - ${utakmica.klubGostNaziv})\n${this.datepipe.transform(utakmica.datumOdrzavanja, 'dd.MM.yyyy., hh:mm')}`
  }

  showUtakmica(id) {
    this.router.navigateByUrl(`utakmica/${id}`);
  }

  showKlub(id) {
    this.router.navigateByUrl(`klub/${id}`);
  }

  downloadTable(event) {
    var thead = document.getElementsByTagName('table')[0].tHead.cloneNode(true);
    var tr = thead.childNodes[0];
    this.generateTableHead(tr);
    tr.removeChild(tr.childNodes[tr.childNodes.length-1]);


    var tbody = document.getElementsByTagName('table')[0].tBodies[0].cloneNode(true);
    for (let i = 0; i < tbody.childNodes.length - 1; i++) {
      var tr = tbody.childNodes[i];
      tr.removeChild(tr.childNodes[tr.childNodes.length - 1]);
    }

    var table = document.createElement('table');
    table.appendChild(thead);
    table.appendChild(tbody);

    let ws = XLSX.utils.table_to_sheet(table);

    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    var date = new Date()
    XLSX.writeFile(wb, `poredak_${date.getFullYear()}_${date.getMonth()}_${date.getDate()}.xlsx`);
  }

  private generateTableHead(tr: ChildNode) {
    var th1 = tr.childNodes[0];
    var th1Child = th1.childNodes[0];
    this.replaceChild(th1, th1Child, "Redni broj");

    var th2 = tr.childNodes[1];
    var th2Child = th2.childNodes[0];
    this.replaceChild(th2, th2Child, "Klub");

    var th3 = tr.childNodes[2];
    var th3Child = th3.childNodes[0];
    this.replaceChild(th3, th3Child, "Odigrane utakmice");

    var th4 = tr.childNodes[3];
    var th4Child = th4.childNodes[0];
    this.replaceChild(th4, th4Child, "Pobjede");

    var th5 = tr.childNodes[4];
    var th5Child = th5.childNodes[0];
    this.replaceChild(th5, th5Child, "Remiji");

    var th6 = tr.childNodes[5];
    var th6Child = th6.childNodes[0];
    this.replaceChild(th6, th6Child, "Porazi");

    var th7 = tr.childNodes[6];
    var th7Child = th7.childNodes[0];
    this.replaceChild(th7, th7Child, "Gol razlika");

    var th8 = tr.childNodes[7];
    var th8Child = th8.childNodes[0];
    this.replaceChild(th8, th8Child, "Bodovi");
  }

  private replaceChild(th: ChildNode, thChild: ChildNode, text: string) {
    th.removeChild(thChild);
    var p = document.createElement('p');
    p.appendChild(document.createTextNode(text));
    th.appendChild(p);
  }
}
