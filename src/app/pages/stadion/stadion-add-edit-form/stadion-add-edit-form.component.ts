import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GradAddFormComponent } from '../../grad/grad-add-form/grad-add-form.component';
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
    classes: "multiselect-custom",
    enableSearchFilter: true,
    addNewItemOnFilter: true
  };

  constructor(
    private api: RestApiService,
    private router: Router,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<StadionAddEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.stadion = new StadionCreate();

    this.id = +this.data.id;
    this.stadion.naziv = this.data.naziv;

    this.getGradove();

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

  save() {
    this.stadion.gradId = this.gradovi.selectedItems[0]?.item_id;
    if (this.stadion.kapacitet != null && this.stadion.kapacitet < 0) {
      this.toastr.warning("Kapacitet stadiona mora biti veći od 0!");
      return;
    }

    if (this.stadion.gradId != null && this.stadion.naziv != null && this.stadion.kapacitet != null && this.stadion.naziv.trim() != "") {
      if (this.isEdit) {
        this.api.put(StadionApi.EDIT_STADION.replace('#', this.id.toString()), this.stadion).subscribe(() => {
          this.toastr.success("Stadion uspješno uređen!");
          this.closeModal();
        });
      }
      else {
        this.api.post(StadionApi.CREATE_STADION, this.stadion).subscribe((response) => {
          if (response) {
            this.toastr.success("Stadion uspješno kreiran!");
            this.closeModal(response);
          }
        })
      }
    }
    else {
      this.toastr.warning("Sva polja su obavezna!");
    }
  }

  clear() {
    this.stadion = new StadionCreate();
    this.stadion.naziv = this.data.naziv;
  }

  closeModal(argument = null) {
    this.dialogRef.close(argument);
  }

  onAddItem(data: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component2";
    dialogConfig.width = "500px";

    dialogConfig.data = { naziv: data }

    this.matDialog.open(GradAddFormComponent, dialogConfig).afterClosed()
      .subscribe(
        (response) => {
          if (response) {
            this.gradovi.dropdownList = [];
            this.getGradove();
            this.gradovi.selectedItems.push({ item_id: response.id, item_text: response.naziv });
          }
        }
      );
  }
}
