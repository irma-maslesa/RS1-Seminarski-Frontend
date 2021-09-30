import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Uloga } from 'src/app/pages/shared/uloga.constant';
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
  @Input() uloga = Uloga.ADMINISTRATOR_KLUBOVA;
  uloge = Uloga;

  imageSrcBase: string = "https://localhost:5001";

  constructor(private router: Router) { }

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
