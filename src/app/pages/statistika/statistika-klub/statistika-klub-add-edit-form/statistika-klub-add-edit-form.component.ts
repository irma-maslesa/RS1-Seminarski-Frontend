import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from '../../../shared/rest-api.service';
import { StatistikaApi } from '../../shared/statistika-api.constant';
import { StatistikaKlubCreate } from '../shared/statistika-klub-create.model';

@Component({
  selector: 'statistika-klub-add-edit-form',
  templateUrl: './statistika-klub-add-edit-form.component.html',
  styleUrls: ['./statistika-klub-add-edit-form.component.scss']
})
export class StatistikaKlubAddEditFormComponent implements OnInit {
  statistika: StatistikaKlubCreate = new StatistikaKlubCreate();

  ngOnInit(): void {
  }

  handleNulls() {
    this.statistika.Dodavanja = this.statistika.Dodavanja ? this.statistika.Dodavanja : 0;
    this.statistika.Korneri = this.statistika.Korneri ? this.statistika.Korneri : 0;
    this.statistika.Napadi = this.statistika.Napadi ? this.statistika.Napadi : 0;
    this.statistika.NapadiOpasni = this.statistika.NapadiOpasni ? this.statistika.NapadiOpasni : 0;
    this.statistika.Odbrane = this.statistika.Odbrane ? this.statistika.Odbrane : 0;
    this.statistika.Ofsajdi = this.statistika.Ofsajdi ? this.statistika.Ofsajdi : 0;
    this.statistika.Posjed = this.statistika.Posjed ? this.statistika.Posjed : 0;
    this.statistika.Prekrsaji = this.statistika.Prekrsaji ? this.statistika.Prekrsaji : 0;
    this.statistika.SuteviBlokirani = this.statistika.SuteviBlokirani ? this.statistika.SuteviBlokirani : 0;
    this.statistika.SuteviOkvir = this.statistika.SuteviOkvir ? this.statistika.SuteviOkvir : 0;
    this.statistika.SuteviVanOkvira = this.statistika.SuteviVanOkvira ? this.statistika.SuteviVanOkvira : 0;
    this.statistika.Uklizavanja = this.statistika.Uklizavanja ? this.statistika.Uklizavanja : 0;

    this.statistika.KlubId = 30;
  }

  clear() {
    this.ngOnInit();
  }
}
