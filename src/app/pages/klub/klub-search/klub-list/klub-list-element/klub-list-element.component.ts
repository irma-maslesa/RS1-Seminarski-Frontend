import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Uloga } from 'src/app/pages/shared/uloga.constant';
import { Klub } from '../../../shared/klub.model';

@Component({
  selector: 'klub-list-element',
  templateUrl: './klub-list-element.component.html',
  styleUrls: ['./klub-list-element.component.scss']
})
export class KlubListElementComponent implements OnInit{
  @Output() editEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();

  @Input() klub: Klub;
  uloga = Uloga.GOST;
  uloge = Uloga;

  imageSrcBase: string = "https://api.p2036.app.fit.ba";

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("korisnik") || localStorage.getItem("korisnik")) {
      var korisnik = JSON.parse(sessionStorage.getItem("korisnik"));

      if(korisnik == null)
        korisnik = JSON.parse(localStorage.getItem("korisnik"));

      this.uloga = korisnik.uloga;
    }
  }

  edit() {
    this.editEmitter.emit(this.klub.id);
  }

  delete() {
    this.deleteEmitter.emit({ id: this.klub.id, naziv: this.klub.naziv });
  }

  handleClick() {
    this.router.navigateByUrl(`klub/${this.klub.id}`);
  }

}
