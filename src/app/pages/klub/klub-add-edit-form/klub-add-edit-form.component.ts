import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LigaApi } from '../../liga/shared/liga-api.constant';
import { MultiselectHelper } from '../../shared/multiselect-helper.model';
import { RestApiService } from '../../shared/rest-api.service';
import { SelectItem } from '../../shared/select-item.model';
import { StadionApi } from '../../stadion/shared/stadion-api.constant';
import { StadionAddEditFormComponent } from '../../stadion/stadion-add-edit-form/stadion-add-edit-form.component';
import { TrenerApi } from '../../trener/shared/trener-api.constant';
import { TrenerAddEditFormComponent } from '../../trener/trener-add-edit-form/trener-add-edit-form.component';
import { KlubApi } from '../shared/klub-api.constant';
import { KlubCreate } from '../shared/klub-create.model';
import { Klub } from '../shared/klub.model';

@Component({
  selector: 'klub-add-edit-form',
  templateUrl: './klub-add-edit-form.component.html',
  styleUrls: ['./klub-add-edit-form.component.scss']
})
export class KlubAddEditFormComponent implements OnInit {
  klub: KlubCreate;
  isEdit = false;
  id: number;
  imageSrc: string;
  imageSrcBase: string = "https://api.p2036.app.fit.ba";
  thumbnail: any;

  constructor(
    private api: RestApiService,
    private router: Router,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<KlubAddEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialog: MatDialog,
    private http: HttpClient,
    private sanitizer: DomSanitizer) { }

  treneri: MultiselectHelper = new MultiselectHelper();
  settingsTrener = {
    text: "Trener",
    singleSelection: true,
    maxHeight: 150,
    labelKey: 'item_text',
    primaryKey: 'item_id',
    autoPosition: false,
    classes: "multiselect-custom",
    enableSearchFilter: true,
    addNewItemOnFilter: true
  };
  stadioni: MultiselectHelper = new MultiselectHelper();
  settingsStadion = {
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
  lige: MultiselectHelper = new MultiselectHelper();
  settingsLiga = {
    text: "Liga",
    singleSelection: true,
    maxHeight: 150,
    labelKey: 'item_text',
    primaryKey: 'item_id',
    autoPosition: false,
    classes: "multiselect-custom"
  };

  ngOnInit(): void {
    this.klub = new KlubCreate();

    this.id = +this.data.id;

    this.getTrenere();
    this.getStadione();
    this.getLige();

    if (this.id) {
      this.isEdit = true;
      this.api.get(KlubApi.GET_KLUB_BY_ID.replace('#', this.id.toString())).subscribe((response) => {
        if (response) {
          this.klub.naziv = response.naziv;
          this.klub.mail = response.mail;
          this.klub.adresa = response.adresa;
          this.klub.trenerId = response.trenerID;
          this.klub.stadionId = response.stadionID;
          this.klub.ligaId = response.liga.id;
          this.klub.slika = response.slika;

          this.imageSrc = this.imageSrcBase +  response.slika;

          if (this.klub.trenerId) {
            this.api.get(TrenerApi.GET_TRENER_BY_ID.replace('#', this.klub.trenerId.toString())).subscribe((response) => {
              if (response) {
                if (response != null) {
                  this.treneri.dropdownList.push({ item_id: response.id, item_text: response.ime + ' ' + response.prezime });
                  this.treneri.selectedItems.push({ item_id: response.id, item_text: response.ime + ' ' + response.prezime });
                }
              }
            });
          }

          this.api.get(StadionApi.GET_STADION_BY_ID.replace('#', this.klub.stadionId.toString())).subscribe((response) => {
            if (response) {
              if (response != null) {
                this.stadioni.dropdownList.push({ item_id: response.id, item_text: response.naziv });
                this.stadioni.selectedItems.push({ item_id: response.id, item_text: response.naziv });
              }
            }
          });
          this.api.get(LigaApi.GET_LIGA_BY_ID.replace('#', this.klub.ligaId.toString())).subscribe((response) => {
            if (response) {
              if (response != null) {
                this.lige.dropdownList.push({ item_id: response.id, item_text: response.naziv });
                this.lige.selectedItems.push({ item_id: response.id, item_text: response.naziv });
              }
            }
          });
        }
      }, (error) => {
        this.router.navigateByUrl('/klub');
      })
    }
  }

  private getTrenere() {
    this.api.get(TrenerApi.GET_SLOBODNI_TRENER).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        if (response != null && response.length > 0) {
          helperList = response.map(function (item) { return { item_id: item.id, item_text: item.ime + ' ' + item.prezime }; });
        }
        this.treneri.dropdownList = helperList;
        this.treneri.selectedItems = []
      }
    });
  }

  private getStadione() {
    this.api.get(StadionApi.GET_SLOBODNI_STADION).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        if (response != null && response.length > 0) {
          helperList = response.map(function (item) { return { item_id: item.id, item_text: item.naziv }; });
        }
        this.stadioni.dropdownList = helperList;
        this.stadioni.selectedItems = []
      }
    });
  }

  private getLige() {
    this.api.get(LigaApi.GET_LIGA).subscribe((response) => {
      if (response) {
        var helperList: SelectItem[] = [];
        if (response != null && response.length > 0) {
          helperList = response.map(function (item) { return { item_id: item.id, item_text: item.naziv }; });
        }
        this.lige.dropdownList = helperList;
        this.lige.selectedItems = []
      }
    });
  }

  save() {
    if (this.matDialog.openDialogs.length > 1) {
      return;
    }

    this.klub.trenerId = this.treneri.selectedItems[0]?.item_id;
    this.klub.stadionId = this.stadioni.selectedItems[0]?.item_id;
    this.klub.ligaId = this.lige.selectedItems[0]?.item_id;

    if (this.klub.naziv != null && this.klub.naziv.trim().length > 0 &&
      this.klub.mail != null && this.klub.mail.trim().length > 0 &&
      this.klub.adresa != null && this.klub.adresa.trim().length > 0 &&
      this.klub.stadionId != null && this.klub.ligaId != null) {

      let data = new FormData();
      data.append('naziv', this.klub.naziv);
      data.append('mail', this.klub.mail);
      data.append('adresa', this.klub.adresa);
      if (this.klub.trenerId != null)
        data.append('trenerId', this.klub.trenerId.toString());
      else
        data.append('trenerId', '');
      data.append('stadionId', this.klub.stadionId.toString());
      data.append('ligaId', this.klub.ligaId.toString());
      if (this.klub.slika != null)
        data.append('slika', this.klub.slika);
      else
        data.append('slika', '');

      if (this.isEdit) {
        this.http.put(KlubApi.EDIT_KLUB.replace('#', this.id.toString()), data).subscribe(() => {
          this.toastr.success("Klub uspješno uređen!");
          this.closeModal();
        })
      }
      else {
        this.http.post(KlubApi.CREATE_KLUB, data).subscribe((response) => {
          if (response) {
            this.toastr.success("Klub uspješno kreiran!");
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

  onAddItemTrener(data: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component-trener";
    dialogConfig.width = "500px";

    if (data.indexOf(" ") > 0) {
      dialogConfig.data = { ime: data.split(' ')[0], prezime: data.split(' ')[1] }
    }
    else {
      dialogConfig.data = { ime: data };
    }

    this.matDialog.open(TrenerAddEditFormComponent, dialogConfig).afterClosed()
      .subscribe(
        (response) => {
          if (response) {
            this.treneri.dropdownList = [];
            this.getTrenere();

            this.treneri.selectedItems = [];
            this.treneri.selectedItems.push({ item_id: response.id, item_text: response.ime + " " + response.prezime });
          }
        }
      );
  }

  onAddItemStadion(data: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component-stadion";
    dialogConfig.width = "500px";

    dialogConfig.data = { naziv: data }

    this.matDialog.open(StadionAddEditFormComponent, dialogConfig).afterClosed()
      .subscribe(
        (response) => {
          if (response) {
            this.stadioni.dropdownList = [];
            this.getStadione();
            this.stadioni.selectedItems = [];
            this.stadioni.selectedItems.push({ item_id: response.id, item_text: response.naziv });
          }
        }
      );
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.klub.slika = event.target.files[0];
      reader.onload = (event) => {
        this.imageSrc = event.target.result.toString();
      }
    }
  }
}
