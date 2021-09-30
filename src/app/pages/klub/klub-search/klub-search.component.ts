import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Uloga } from '../../shared/uloga.constant';

@Component({
  selector: 'klub-search',
  templateUrl: './klub-search.component.html',
  styleUrls: ['./klub-search.component.scss']
})
export class KlubSearchComponent implements OnInit {
  @Input() uloga = Uloga.ADMINISTRATOR_KLUBOVA;

  searchObject;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      if (data != null && data.uloga != null && data.uloga != Uloga.ADMINISTRATOR_KLUBOVA) {
        this.uloga = data.uloga;
      }
    });
  }
  submit(searchObject) {
    this.searchObject = searchObject;

    if (searchObject.naziv === '')
      this.searchObject.ime = null;
  }
}
