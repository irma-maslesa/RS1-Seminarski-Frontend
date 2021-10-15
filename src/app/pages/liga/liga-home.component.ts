import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultiselectHelper } from '../shared/multiselect-helper.model';
import { RestApiService } from '../shared/rest-api.service';
import { SelectItem } from '../shared/select-item.model';
import { LigaApi } from './shared/liga-api.constant';

@Component({
  selector: 'liga-home',
  templateUrl: './liga-home.component.html',
  styleUrls: ['./liga-home.component.scss']
})
export class LigaHomeComponent implements OnInit {
  lige: MultiselectHelper = new MultiselectHelper();
  settings = {
    text: "Odaberi ligu",
    singleSelection: true,
    maxHeight: 150,
    labelKey: 'item_text',
    primaryKey: 'item_id',
    autoPosition: false,
    classes: "multiselect-custom"
  };
  constructor(
    private api: RestApiService,
    private router: Router) { }

  ngOnInit(): void {

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

  onItemSelect(item: SelectItem) {
    this.router.navigateByUrl(`liga/${item.item_id}`);
  }
}
