import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from '../../shared/rest-api.service';
import { LigaApi } from '../shared/liga-api.constant';
import { LigaCreate } from '../shared/liga-create.model';

@Component({
  selector: 'app-liga-add-edit-form',
  templateUrl: './liga-add-edit-form.component.html',
  styleUrls: ['./liga-add-edit-form.component.scss']
})
export class LigaAddEditFormComponent implements OnInit {
  liga: LigaCreate;
  isEdit = false;
  id: number;

  constructor(
    private api: RestApiService,
    private router: Router,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<LigaAddEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.liga = new LigaCreate();

    this.id = +this.data.id;

    if (this.id) {
      this.isEdit = true;
      this.api.get(LigaApi.GET_LIGA_BY_ID.replace('#', this.id.toString())).subscribe((response) => {
        if (response) {
          this.liga = response;
        }
      }, (error) => {
        this.router.navigateByUrl('/liga');
      })
    }
  }

  save() {
    if (this.liga.naziv != null && this.liga.naziv.trim() != "") {
      if (this.isEdit) {
        this.api.put(LigaApi.EDIT_LIGA.replace('#', this.id.toString()), this.liga).subscribe(() => {
          this.toastr.success("Liga uspješno uređena!");
          this.closeModal();
        })
      }
      else {
        this.api.post(LigaApi.CREATE_LIGA, this.liga).subscribe((response) => {
          if (response) {
            this.toastr.success("Liga uspješno kreirana!");
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
    this.liga = new LigaCreate();
  }

  closeModal(argument = null) {
    this.dialogRef.close(argument);
  }
}
