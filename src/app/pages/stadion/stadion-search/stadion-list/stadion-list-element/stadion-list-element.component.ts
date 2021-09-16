import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Stadion } from '../../../shared/stadion.model';

@Component({
  selector: 'stadion-list-element',
  templateUrl: './stadion-list-element.component.html',
  styleUrls: ['./stadion-list-element.component.scss']
})
export class StadionListElementComponent{
  @Output() editEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();

  @Input() stadion: Stadion;

  constructor(private router: Router) { }

  edit() {
    this.editEmitter.emit(this.stadion.id);
  }

  delete() {
    this.deleteEmitter.emit({ id: this.stadion.id, naziv: this.stadion.naziv});
  }

}
