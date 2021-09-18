import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LigaApi } from '../../liga/shared/liga-api.constant';
import { MultiselectHelper } from '../../shared/multiselect-helper.model';
import { RestApiService } from '../../shared/rest-api.service';
import { SelectItem } from '../../shared/select-item.model';
import { SezonaApi } from '../shared/sezona-api.constant';
import { SezonaCreate } from '../shared/sezona-create.model';

@Component({
  selector: 'sezona-add-edit-form',
  templateUrl: './sezona-add-edit-form.component.html',
  styleUrls: ['./sezona-add-edit-form.component.scss']
})
export class SezonaAddEditFormComponent implements OnInit {
  sezona: SezonaCreate;
  isEdit = false;
  id: number;
  ligaId: number;

  lige: MultiselectHelper = new MultiselectHelper();
  settings = {
    text: "Liga",
    singleSelection: true,
    maxHeight: 150,
    labelKey: 'item_text',
    primaryKey: 'item_id',
    autoPosition: false,
    classes: "multiselect-custom",
    disabled: false
  };

  constructor(
    private api: RestApiService,
    private router: Router,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<SezonaAddEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.sezona = new SezonaCreate();

    this.id = +this.data.id;
    this.ligaId = +this.data.ligaId;

    this.getLige();

    if (this.id) {
      this.isEdit = true;
      this.api.get(SezonaApi.GET_SEZONA_BY_ID.replace('#', this.id.toString())).subscribe((response) => {
        if (response) {
          this.sezona.datumPocetka = response.datumPocetka.toString().split('T')[0];
          this.sezona.datumZavrsetka = response.datumZavrsetka.toString().split('T')[0];
          this.sezona.ligaId = response.liga.id;

          this.lige.selectedItems = [];
          this.lige.selectedItems.push(this.lige.dropdownList.find((item) => { return item.item_id == this.sezona.ligaId }));
        }
      }, (error) => {
        this.router.navigateByUrl('/sezona');
      })
    }
  }

  private getLige() {
    this.api.get(LigaApi.GET_LIGA).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        if (response != null && response.length > 0) {
          helperList = response.map(function (item) { return { item_id: item.id, item_text: item.naziv }; });
        }
        this.lige.dropdownList = helperList;

        if (this.ligaId) {
          this.lige.selectedItems.push(this.lige.dropdownList.find((item) => { return item.item_id == this.ligaId }));
          this.settings = {
            text: "Liga",
            singleSelection: true,
            maxHeight: 150,
            labelKey: 'item_text',
            primaryKey: 'item_id',
            autoPosition: false,
            classes: "multiselect-custom",
            disabled: true
          };
        }
      }
    });
  }

  save() {
    this.sezona.ligaId = this.lige.selectedItems[0]?.item_id;

    if (this.sezona.datumPocetka != null && this.sezona.datumZavrsetka != null && this.sezona.datumPocetka > this.sezona.datumZavrsetka) {
      this.toastr.warning("Datum početka ne može biti nakon datuma završetka!");
      return;
    }

    if (this.sezona.datumPocetka != null  && this.sezona.datumZavrsetka != null && new Date(this.sezona.datumPocetka).getFullYear() == new Date(this.sezona.datumZavrsetka).getFullYear()) {
      this.toastr.warning("Sezona ne može početi i zvršiti u istoj godini!");
      return;
    }

    if (this.sezona.datumPocetka != null && this.sezona.datumPocetka.toString() != "" 
        && this.sezona.datumZavrsetka != null && this.sezona.datumZavrsetka.toString() != "" ) {
      if (this.isEdit) {
        this.api.put(SezonaApi.EDIT_SEZONA.replace('#', this.id.toString()), this.sezona).subscribe(() => {
          this.toastr.success("Sezona uspješno uređena!");
          this.closeModal();
        });
      }
      else {
        this.api.post(SezonaApi.CREATE_SEZONA, this.sezona).subscribe((response) => {
          if (response) {
            this.toastr.success("Sezona uspješno kreirana!");
            this.closeModal();
          }
        })
      }
    }
    else {
      this.toastr.warning("Sva polja su obavezna!");
    }
  }

  clear() {
    this.ngOnInit();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
