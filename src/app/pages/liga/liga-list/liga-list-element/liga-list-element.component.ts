import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Liga } from '../../shared/liga.model';

@Component({
  selector: 'liga-list-element',
  templateUrl: './liga-list-element.component.html',
  styleUrls: ['./liga-list-element.component.scss']
})
export class LigaListElementComponent {
  @Output() clickEmitter = new EventEmitter();
  @Output() editEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();

  @Input() liga: Liga;

  constructor(private router: Router) { }

  edit() {
    this.editEmitter.emit(this.liga.id);
  }

  delete() {
    this.deleteEmitter.emit({ id: this.liga.id, naziv: this.liga.naziv });
  }

  handleClick() {
    this.clickEmitter.emit(this.liga.id);
  }

}
