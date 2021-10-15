import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Uloga } from 'src/app/pages/shared/uloga.constant';
import { Sezona } from '../../shared/sezona.model';

@Component({
  selector: 'sezona-list-element',
  templateUrl: './sezona-list-element.component.html',
  styleUrls: ['./sezona-list-element.component.scss']
})
export class SezonaListElementComponent implements OnInit{
  @Output() editEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();
  @Output() clickEmitter = new EventEmitter();

  uloga = Uloga.GOST;
  uloge = Uloga;
  
  @Input() sezona: Sezona;

  ngOnInit(): void {
    if (sessionStorage.getItem("korisnik") || localStorage.getItem("korisnik")) {
      var korisnik = JSON.parse(sessionStorage.getItem("korisnik"));

      if(korisnik == null)
        korisnik = JSON.parse(localStorage.getItem("korisnik"));

      this.uloga = korisnik.uloga;
    }
  }

  edit() {
    this.editEmitter.emit(this.sezona.id);
  }

  delete() {
    this.deleteEmitter.emit({ id: this.sezona.id, naziv: new Date(this.sezona.datumPocetka).getFullYear() + "/" + new Date(this.sezona.datumZavrsetka).getFullYear() });
  }

  handleClick() {
    this.clickEmitter.emit(this.sezona.id);
  }

}
