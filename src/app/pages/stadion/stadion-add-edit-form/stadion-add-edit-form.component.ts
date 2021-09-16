import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GradApi } from '../../grad/shared/grad-api.constant';
import { MultiselectHelper } from '../../shared/multiselect-helper.model';
import { RestApiService } from '../../shared/rest-api.service';
import { SelectItem } from '../../shared/select-item.model';
import { StadionApi } from '../shared/stadion-api.constant';
import { StadionCreate } from '../shared/stadion-create.model';

@Component({
  selector: 'app-stadion-add-edit-form',
  templateUrl: './stadion-add-edit-form.component.html',
  styleUrls: ['./stadion-add-edit-form.component.scss']
})
export class StadionAddEditFormComponent implements OnInit {
  stadion: StadionCreate;
  isEdit = false;
  id: number;

  gradovi: MultiselectHelper = new MultiselectHelper();
  settings = {
    text: "Grad",
    singleSelection: true,
    maxHeight: 150,
    labelKey: 'item_text',
    primaryKey: 'item_id',
    autoPosition: false,
    classes: "multiselect-custom"
  };

  constructor(
    private api: RestApiService,
    private router: Router,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<StadionAddEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.stadion = new StadionCreate();

    this.id = +this.data.id;

    this.api.get(GradApi.GET_GRAD).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        if (response != null && response.length > 0) {
          helperList = response.map(function (item) { return { item_id: item.id, item_text: item.naziv }; });
        }
        this.gradovi.dropdownList = helperList;
      }
    })

    if (this.id) {
      this.isEdit = true;
      this.api.get(StadionApi.GET_STADION_BY_ID.replace('#', this.id.toString())).subscribe((response) => {
        if (response) {
          this.stadion.naziv = response.naziv;
          this.stadion.kapacitet = response.kapacitet;
          this.stadion.gradId = response.grad.id;
          
          this.gradovi.selectedItems = [];
          this.gradovi.selectedItems.push(this.gradovi.dropdownList.find((item) => { return item.item_id == this.stadion.gradId }));
        }
      }, (error) => {
        this.router.navigateByUrl('/stadion');
      })
    }
  }

  save() {
    if (this.isEdit) {
      this.api.put(StadionApi.EDIT_STADION.replace('#', this.id.toString()), this.stadion).subscribe(() => {
        this.toastr.success("Stadion uspješno uređen!");
        this.closeModal();
      })
    }
    else {
      this.api.post(StadionApi.CREATE_STADION, this.stadion).subscribe((response) => {
        if (response) {
          this.toastr.success("Stadion uspješno kreiran!");
          this.closeModal();
        }
      })
    }
  }

  clear() {
    this.ngOnInit();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
