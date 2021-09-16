import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GradApi } from 'src/app/pages/grad/shared/grad-api.constant';
import { MultiselectHelper } from 'src/app/pages/shared/multiselect-helper.model';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { SelectItem } from 'src/app/pages/shared/select-item.model';

@Component({
  selector: 'stadion-search-form',
  templateUrl: './stadion-search-form.component.html',
  styleUrls: ['./stadion-search-form.component.scss']
})
export class StadionSearchFormComponent implements OnInit {
  @Output() searchEmitter = new EventEmitter();

  searchObject: any;

  gradovi: MultiselectHelper = new MultiselectHelper();
  settingsGrad = {
    text: "Grad",
    singleSelection: true,
    maxHeight: 150,
    labelKey: 'item_text',
    primaryKey: 'item_id',
    autoPosition: false,
    classes: "multiselect-custom",
    enableSearchFilter: true
  };

  klubovi: MultiselectHelper = new MultiselectHelper();
  settingsKlub = {
    text: "Klub",
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
      kapacitet: null,
      gradId: null,
      klubId: null
    }

    this.getGradove();
  }

  search() {
    this.searchObject.gradId = this.gradovi.selectedItems[0]?.item_id;
    this.searchObject.klubId = this.klubovi.selectedItems[0]?.item_id;

    this.searchEmitter.emit({ ...this.searchObject });
  }

  cancel() {
    this.ngOnInit();
    this.search();
  }

  private getGradove() {
    this.api.get(GradApi.GET_GRAD).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        if (response != null && response.length > 0) {
          helperList = response.map(function (item) { return { item_id: item.id, item_text: item.naziv }; });
        }
        this.gradovi.dropdownList = helperList;
      }
    });
  }
}
