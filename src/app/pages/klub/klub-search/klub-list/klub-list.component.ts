import { HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModal } from 'src/app/pages/shared/confirm-modal/confirm.modal';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { KlubAddEditFormComponent } from '../../klub-add-edit-form/klub-add-edit-form.component';
import { KlubApi } from '../../shared/klub-api.constant';
import { Klub } from '../../shared/klub.model';

@Component({
  selector: 'klub-list',
  templateUrl: './klub-list.component.html',
  styleUrls: ['./klub-list.component.scss']
})
export class KlubListComponent implements OnInit, OnChanges {
  @Input() searchObject;
  @Input() scrollable = false;
  @Input() show = true;

  klubList: Klub[] = [];

  constructor(
    private api: RestApiService,
    private toastr: ToastrService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {

    if (this.searchObject)
      this.getKlubve(this.searchObject);
    else
      this.api.get(KlubApi.GET_KLUB)
        .subscribe((response) => {
          this.klubList = response;
        });
  }

  ngOnChanges(changes: SimpleChanges): void {
    var currentObject = changes.searchObject;

    if (!currentObject.firstChange) {
      var searchObject = currentObject.currentValue;

      this.getKlubve(searchObject);
    }
  }

  private getKlubve(searchObject: any) {
    var params = new HttpParams();
    params = searchObject.naziv ? params.set('naziv', searchObject.naziv) : params;
    params = searchObject.mail ? params.set('mail', searchObject.mail) : params;
    params = searchObject.adresa ? params.set('adresa', searchObject.adresa) : params;
    params = searchObject.trenerId ? params.set('trenerId', searchObject.trenerId) : params;
    params = searchObject.stadionId ? params.set('stadionId', searchObject.stadionId) : params;
    params = searchObject.ligaId ? params.set('ligaId', searchObject.ligaId) : params;

    var options = { params: params };
    this.api.get(KlubApi.GET_KLUB, options)
      .subscribe((response) => {
        this.klubList = response;
      });
  }

  handleClick(id = 0) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.width = "450px";

    dialogConfig.data = { id: id }
    this.matDialog.open(KlubAddEditFormComponent, dialogConfig).afterClosed()
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
        this.api.delete(KlubApi.DELETE_KLUB.replace('#', event.id.toString())).subscribe(() => {
          this.toastr.success("Klub uspješno obrisan!");
          this.ngOnInit();
        })
      }
    });
  }
}