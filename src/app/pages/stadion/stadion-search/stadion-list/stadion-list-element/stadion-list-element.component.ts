import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Uloga } from 'src/app/pages/shared/uloga.constant';
import { Stadion } from '../../../shared/stadion.model';

@Component({
  selector: 'stadion-list-element',
  templateUrl: './stadion-list-element.component.html',
  styleUrls: ['./stadion-list-element.component.scss']
})
export class StadionListElementComponent implements OnInit{
  @Output() editEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();

  @Input() stadion: Stadion;
  @Input() uloga = Uloga.ADMINISTRATOR_KLUBOVA;
  uloge = Uloga;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.stadion);
  }

  edit() {
    this.editEmitter.emit(this.stadion.id);
  }

  delete() {
    this.deleteEmitter.emit({ id: this.stadion.id, naziv: this.stadion.naziv});
  }

}
