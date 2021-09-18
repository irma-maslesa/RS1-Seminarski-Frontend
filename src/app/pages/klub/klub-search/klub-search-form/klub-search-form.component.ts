import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LigaApi } from 'src/app/pages/liga/shared/liga-api.constant';
import { MultiselectHelper } from 'src/app/pages/shared/multiselect-helper.model';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { SelectItem } from 'src/app/pages/shared/select-item.model';

@Component({
  selector: 'klub-search-form',
  templateUrl: './klub-search-form.component.html',
  styleUrls: ['./klub-search-form.component.scss']
})
export class KlubSearchFormComponent implements OnInit {
  @Output() searchEmitter = new EventEmitter();

  searchObject: any;
  
  lige: MultiselectHelper = new MultiselectHelper();
  settings = {
    text: "Liga",
    singleSelection: true,
    maxHeight: 150,
    labelKey: 'item_text',
    primaryKey: 'item_id',
    autoPosition: false,
    classes: "multiselect-custom",
    enableSearchFilter: true
  };

  constructor(
    private api: RestApiService) { }
    
  ngOnInit(): void {
    this.searchObject = {
      naziv: "",
      ligaId: null
    }

    this.getLige();
  }

  getLige() {
    this.api.get(LigaApi.GET_LIGA).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        if (response != null && response.length > 0) {
          helperList = response.map(function (item) { return { item_id: item.id, item_text: item.naziv }; });
        }
        this.lige.dropdownList = helperList;
      }
    });
  }

  search() {
    this.searchObject.ligaId = this.lige.selectedItems[0]?.item_id;
    this.searchEmitter.emit({ ...this.searchObject });
  }

  cancel() {
    this.ngOnInit();
    this.search();
  }
}
