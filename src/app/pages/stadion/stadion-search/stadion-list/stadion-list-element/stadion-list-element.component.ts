import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Uloga } from 'src/app/pages/shared/uloga.constant';
import { Stadion } from '../../../shared/stadion.model';

@Component({
  selector: 'stadion-list-element',
  templateUrl: './stadion-list-element.component.html',
  styleUrls: ['./stadion-list-element.component.scss']
})
export class StadionListElementComponent implements OnInit {

  @Output() editEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();

  @Input() stadion: Stadion;
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
    this.editEmitter.emit(this.stadion.id);
  }

  delete() {
    this.deleteEmitter.emit({ id: this.stadion.id, naziv: this.stadion.naziv });
  }

}
