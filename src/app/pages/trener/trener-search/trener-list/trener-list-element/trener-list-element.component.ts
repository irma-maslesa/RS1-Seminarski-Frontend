import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Uloga } from 'src/app/pages/shared/uloga.constant';
import { Trener } from '../../../shared/trener.model';

@Component({
  selector: 'trener-list-element',
  templateUrl: './trener-list-element.component.html',
  styleUrls: ['./trener-list-element.component.scss']
})
export class TrenerListElementComponent implements OnInit{
  @Output() editEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();

  @Input() trener: Trener;

  uloga = Uloga.GOST;
  uloge = Uloga;
  
  ngOnInit(): void {
    if (sessionStorage.getItem("korisnik") || localStorage.getItem("korisnik")) {
      var korisnik = JSON.parse(sessionStorage.getItem("korisnik"));

      if(korisnik == null)
        korisnik = JSON.parse(localStorage.getItem("korisnik"));

      this.uloga = korisnik.uloga;
    }
  }

  edit() {
    this.editEmitter.emit(this.trener.id);
  }

  delete() {
    this.deleteEmitter.emit({ id: this.trener.id, naziv: this.trener.ime + ' ' + this.trener.prezime });
  }

}
