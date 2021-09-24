import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { ConfirmModal } from '../../shared/confirm-modal/confirm.modal';
import { SezonaAddEditFormComponent } from '../sezona-add-edit-form/sezona-add-edit-form.component';
import { SezonaApi } from '../shared/sezona-api.constant';
import { Sezona } from '../shared/sezona.model';

@Component({
  selector: 'sezona-list',
  templateUrl: './sezona-list.component.html',
  styleUrls: ['./sezona-list.component.scss']
})
export class SezonaListComponent implements OnInit, OnChanges {
  @Output() clickEmitter = new EventEmitter();
  @Input() searchObject;
  @Input() show = true;

  sezonaList: Sezona[] = [];

  constructor(
    private api: RestApiService,
    private toastr: ToastrService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.getSezone(this.searchObject);
  }

  ngOnChanges(changes: SimpleChanges): void {
    var currentObject = changes.searchObject;

    if (!currentObject.firstChange) {
      var searchObject = currentObject.currentValue;

      this.getSezone(searchObject);
    }
  }

  private getSezone(searchObject: any) {
    var params = new HttpParams();
    params = searchObject?.datumPocetka ? params.set('datumPocetka', searchObject.datumPocetka) : params;
    params = searchObject?.datumZavrsetka ? params.set('datumZavrsetka', searchObject.datumZavrsetka) : params;
    params = searchObject?.ligaId ? params.set('ligaId', searchObject.ligaId) : params;

    var options = { params: params };
    this.api.get(SezonaApi.GET_SEZONA, options)
      .subscribe((response) => {
        this.sezonaList = response;
      });
  }

  edit(id = 0) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.width = "450px";

    dialogConfig.data = { id: id, ligaId: this.searchObject?.ligaId }
    this.matDialog.open(SezonaAddEditFormComponent, dialogConfig).afterClosed()
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
        this.api.delete(SezonaApi.DELETE_SEZONA.replace('#', event.id.toString())).subscribe(() => {
          this.toastr.success("Sezona uspješno obrisana!");
          this.ngOnInit();
        })
      }
    })
  }

  handleClick(id) {
    this.clickEmitter.emit(id);
  }
}