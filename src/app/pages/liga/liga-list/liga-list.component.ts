import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from 'src/app/pages/shared/rest-api.service';
import { ConfirmModal } from '../../shared/confirm-modal/confirm.modal';
import { LigaAddEditFormComponent } from '../liga-add-edit-form/liga-add-edit-form.component';
import { LigaApi } from '../shared/liga-api.constant';
import { Liga } from '../shared/liga.model';
@Component({
  selector: 'liga-list',
  templateUrl: './liga-list.component.html',
  styleUrls: ['./liga-list.component.scss']
})
export class LigaListComponent implements OnInit {
  @Input() searchObject;

  ligaList: Liga[] = [];

  constructor(
    private api: RestApiService,
    private toastr: ToastrService,
    private router: Router,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.api.get(LigaApi.GET_LIGA)
      .subscribe((response) => {
        this.ligaList = response;
      });
  }

  edit(id = 0) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component-add";
    dialogConfig.width = "450px";

    dialogConfig.data = { id: id }
    this.matDialog.open(LigaAddEditFormComponent, dialogConfig).afterClosed()
      .subscribe(() => this.ngOnInit());
  }

  delete(event) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component-delete";
    dialogConfig.width = "450px";
    dialogConfig.data = { naziv: event.naziv }
    this.matDialog.open(ConfirmModal, dialogConfig).afterClosed().subscribe((response) => {
      if (response == "YES") {
        this.api.delete(LigaApi.DELETE_LIGA.replace('#', event.id.toString())).subscribe(() => {
          this.toastr.success("Liga uspješno obrisana!");
          this.ngOnInit();
        })
      }
    })
  }

  handleClick(id) {
    console.log("HERE");
    this.router.navigateByUrl(`/liga/${id}`, { state: { show: true } });
  }
}

