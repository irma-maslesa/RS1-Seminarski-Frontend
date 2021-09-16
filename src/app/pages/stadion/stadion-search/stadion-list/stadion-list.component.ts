import { HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModal } from 'src/app/pages/shared/confirm-modal/confirm.modal';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { StadionApi } from '../../shared/stadion-api.constant';
import { Stadion } from '../../shared/stadion.model';
import { StadionAddEditFormComponent } from '../../stadion-add-edit-form/stadion-add-edit-form.component';

@Component({
  selector: 'stadion-list',
  templateUrl: './stadion-list.component.html',
  styleUrls: ['./stadion-list.component.scss']
})
export class StadionListComponent implements OnInit, OnChanges {
  @Input() searchObject;

  stadionList: Stadion[] = [];

  constructor(
    private api: RestApiService,
    private toastr: ToastrService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.api.get(StadionApi.GET_STADION)
      .subscribe((response) => {
        this.stadionList = response;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    var currentObject = changes.searchObject;

    if (!currentObject.firstChange) {
      var searchObject = currentObject.currentValue;

      var params = new HttpParams();
      params = searchObject?.naziv ? params.set('naziv', searchObject.naziv) : params;
      params = searchObject?.kapacitet ? params.set('kapacitet', searchObject.kapacitet) : params;
      params = searchObject?.gradId ? params.set('gradId', searchObject.gradId) : params;
      params = searchObject?.klubId ? params.set('klubId', searchObject.klubId) : params;

      var options = { params: params };
      this.api.get(StadionApi.GET_STADION, options)
        .subscribe((response) => {
          this.stadionList = response;
        });
    }
  }

  handleClick(id = 0) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.width = "450px";

    dialogConfig.data = { id: id }
    this.matDialog.open(StadionAddEditFormComponent, dialogConfig).afterClosed()
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
        this.api.delete(StadionApi.DELETE_STADION.replace('#', event.id.toString())).subscribe(() => {
          this.toastr.success("Stadion uspješno obrisan!");
          this.ngOnInit();
        })
      }
    })
  }
}