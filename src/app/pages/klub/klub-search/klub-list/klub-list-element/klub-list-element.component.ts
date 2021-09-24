import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Klub } from '../../../shared/klub.model';

@Component({
  selector: 'klub-list-element',
  templateUrl: './klub-list-element.component.html',
  styleUrls: ['./klub-list-element.component.scss']
})
export class KlubListElementComponent {
  @Output() editEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();

  @Input() klub: Klub;
  @Input() show;

  constructor() { }

  edit() {
    this.editEmitter.emit(this.klub.id);
  }

  delete() {
    this.deleteEmitter.emit({ id: this.klub.id, naziv: this.klub.naziv });
  }

}
