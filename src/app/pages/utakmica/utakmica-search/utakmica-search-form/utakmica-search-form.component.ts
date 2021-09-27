import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LigaApi } from 'src/app/pages/liga/shared/liga-api.constant';
import { ConfirmModal } from 'src/app/pages/shared/confirm-modal/confirm.modal';
import { MultiselectHelper } from 'src/app/pages/shared/multiselect-helper.model';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { SelectItem } from 'src/app/pages/shared/select-item.model';
import { StadionApi } from 'src/app/pages/stadion/shared/stadion-api.constant';

@Component({
  selector: 'utakmica-search-form',
  templateUrl: './utakmica-search-form.component.html',
  styleUrls: ['./utakmica-search-form.component.scss']
})
export class UtakmicaSearchFormComponent implements OnInit {
  @Output() searchEmitter = new EventEmitter();

  searchObject: any;
  
  stadioni: MultiselectHelper = new MultiselectHelper();
  settings = {
    text: "Stadion",
    singleSelection: true,
    maxHeight: 150,
    labelKey: 'item_text',
    primaryKey: 'item_id',
    autoPosition: false,
    classes: "multiselect-custom",
    enableSearchFilter: true,
    addNewItemOnFilter: true
  };

  constructor(
    private api: RestApiService) { }
    
  ngOnInit(): void {
    this.stadioni.selectedItems = [];

    this.searchObject = {
      StadionId: null
    }

    this.getStadione();
  }

  getStadione() {
    this.api.get(StadionApi.GET_STADION).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        if (response != null && response.length > 0) {
          helperList = response.map(function (item) { return { item_id: item.id, item_text: item.naziv }; });
        }
        this.stadioni.dropdownList = helperList;
        this.stadioni.selectedItems = [];
      }
    });
  }

  search() {
    this.searchObject.StadionId = this.stadioni.selectedItems[0]?.item_id;
    
    this.searchEmitter.emit({ ...this.searchObject });
  }

  cancel() {
    this.ngOnInit();
    this.search();
  }
}
