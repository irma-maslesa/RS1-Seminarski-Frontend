import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Sezona } from '../../shared/sezona.model';

@Component({
  selector: 'sezona-list-element',
  templateUrl: './sezona-list-element.component.html',
  styleUrls: ['./sezona-list-element.component.scss']
})
export class SezonaListElementComponent {
  @Output() editEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();
  @Output() clickEmitter = new EventEmitter();

  @Input() show: boolean;
  @Input() sezona: Sezona;

  constructor(private router: Router) {
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
