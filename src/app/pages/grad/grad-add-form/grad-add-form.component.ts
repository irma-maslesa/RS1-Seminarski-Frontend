import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoadingOverlayComponent } from 'ag-grid-community/dist/lib/rendering/overlays/loadingOverlayComponent';
import { ToastrService } from 'ngx-toastr';
import { EntitetApi } from '../../entitet/shared/entitet-api.constant';
import { LoV } from '../../shared/LoV.model';
import { MultiselectHelper } from '../../shared/multiselect-helper.model';
import { RestApiService } from '../../shared/rest-api.service';
import { SelectItem } from '../../shared/select-item.model';
import { GradApi } from '../shared/grad-api.constant';
import { GradCreate } from '../shared/grad-create.model';

@Component({
  selector: 'grad-add-form',
  templateUrl: './grad-add-form.component.html',
  styleUrls: ['./grad-add-form.component.scss']
})
export class GradAddFormComponent implements OnInit {
  grad: GradCreate;

  entiteti: MultiselectHelper = new MultiselectHelper();
  settings = [{
    text: "Entitet",
    singleSelection: true,
    maxHeight: 150,
    labelKey: 'item_text',
    primaryKey: 'item_id',
    autoPosition: false
  }];

  constructor(
    private api: RestApiService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<GradAddFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.grad = new GradCreate();

    this.api.get(EntitetApi.GET_ENTITET).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        if (response != null && response.length > 0) {
          helperList = response.map(function (item) { return { item_id: item.id, item_text: item.naziv }; });
        }
        this.entiteti.dropdownList = helperList;
      }
    })
  }

  save() {
    this.api.post(GradApi.CREATE_GRAD, this.grad).subscribe((response) => {
      if (response) {
        this.toastr.success("Grad uspješno kreiran!");
        this.closeModal();
      }
    })
  }

  clear() {
    this.ngOnInit();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
