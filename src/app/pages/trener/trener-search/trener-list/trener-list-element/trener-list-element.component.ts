import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Trener } from '../../../shared/trener.model';

@Component({
  selector: 'trener-list-element',
  templateUrl: './trener-list-element.component.html',
  styleUrls: ['./trener-list-element.component.scss']
})
export class TrenerListElementComponent {
  @Output() editEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();

  @Input() trener: Trener;

  constructor(private router: Router) { }

  edit() {
    console.log(this.trener);
    this.editEmitter.emit(this.trener.id);
  }

  delete() {
    this.deleteEmitter.emit({ id: this.trener.id, naziv: this.trener.ime + ' ' + this.trener.prezime });
  }

}