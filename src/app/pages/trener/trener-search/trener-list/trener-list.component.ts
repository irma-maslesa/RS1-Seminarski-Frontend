import { HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModal } from 'src/app/pages/shared/confirm-modal/confirm.modal';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { TrenerApi } from '../../shared/trener-api.constant';
import { Trener } from '../../shared/trener.model';
import { TrenerAddEditFormComponent } from '../../trener-add-edit-form/trener-add-edit-form.component';

@Component({
  selector: 'trener-list',
  templateUrl: './trener-list.component.html',
  styleUrls: ['./trener-list.component.scss']
})
export class TrenerListComponent implements OnInit, OnChanges {
  @Input() searchObject;

  trenerList: Trener[] = [new Trener(), new Trener(), new Trener()];

  constructor(
    private api: RestApiService,
    private toastr: ToastrService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.api.get(TrenerApi.GET_TRENER)
      .subscribe((response) => {
        this.trenerList = response.sort((a, b) => (a.ime + a.prezime > b.ime + b.prezime) ? 1 : -1);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    var currentObject = changes.searchObject;

    if (!currentObject.firstChange) {
      var searchObject = currentObject.currentValue;

      var params = new HttpParams();
      params = searchObject.ime ? params.set('ime', searchObject.ime) : params;
      params = searchObject.prezime ? params.set('prezime', searchObject.prezime) : params;
      params = searchObject.mail ? params.set('mail', searchObject.mail) : params;
      params = searchObject.datumRodjenja ? params.set('datumRodjenja', searchObject.datumRodjenja) : params;

      var options = { params: params };
      this.api.get(TrenerApi.GET_TRENER, options)
        .subscribe((response) => {
          this.trenerList = response.sort((a, b) => (a.ime + a.prezime > b.ime + b.prezime) ? 1 : -1);
        });
    }
  }

  handleClick(id = 0) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.width = "450px";

    dialogConfig.data = { id: id }
    this.matDialog.open(TrenerAddEditFormComponent, dialogConfig).afterClosed()
      .subscribe(() => this.ngOnInit());
  }

  delete(event) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.width = "450px";
    dialogConfig.data = { naziv: event.naziv }
    this.matDialog.open(ConfirmModal, dialogConfig).afterClosed().subscribe((response) => {
      if (response == "YES") {
        this.api.delete(TrenerApi.DELETE_TRENER.replace('#', event.id.toString())).subscribe(() => {
          this.toastr.success("Trener uspješno obrisan!");
          this.ngOnInit();
        })
      }
    })
  }
}