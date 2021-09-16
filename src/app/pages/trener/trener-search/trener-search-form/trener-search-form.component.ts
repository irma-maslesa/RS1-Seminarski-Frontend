import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'trener-search-form',
  templateUrl: './trener-search-form.component.html',
  styleUrls: ['./trener-search-form.component.scss']
})
export class TrenerSearchFormComponent implements OnInit {
  @Output() searchEmitter = new EventEmitter();

  searchObject: any;

  ngOnInit(): void {
    this.searchObject = {
      ime: "",
      prezime: "",
      mail: "",
      datumRodjenja: null
    }
  }

  search() {
    this.searchEmitter.emit({ ...this.searchObject });
  }

  cancel() {
    this.ngOnInit();
    this.search();
  }
}
