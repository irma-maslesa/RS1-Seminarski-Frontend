import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from '../../shared/rest-api.service';
import { TrenerApi } from '../shared/trener-api.constant';
import { TrenerCreate } from '../shared/trener-create.model';

@Component({
  selector: 'app-trener-add-edit-form',
  templateUrl: './trener-add-edit-form.component.html',
  styleUrls: ['./trener-add-edit-form.component.scss']
})
export class TrenerAddEditFormComponent implements OnInit {
  trener: TrenerCreate;
  isEdit = false;
  id: number;

  constructor(
    private api: RestApiService,
    private router: Router,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<TrenerAddEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.trener = new TrenerCreate();

    this.id = +this.data.id;

    if (this.id) {
      this.isEdit = true;
      this.api.get(TrenerApi.GET_TRENER_BY_ID.replace('#', this.id.toString())).subscribe((response) => {
        if (response) {
          this.trener = response;

          this.trener.datumRodjenja = this.trener.datumRodjenja.toString().split('T')[0];
        }
      }, (error) => {
        this.router.navigateByUrl('/trener');
      })
    }
  }

  save() {
    if (this.isEdit) {
      this.api.put(TrenerApi.EDIT_TRENER.replace('#', this.id.toString()), this.trener).subscribe(() => {
        this.toastr.success("Trener uspješno uređen!");
        this.closeModal();
      })
    }
    else {
      this.api.post(TrenerApi.CREATE_TRENER, this.trener).subscribe((response) => {
        if (response) {
          this.toastr.success("Trener uspješno kreiran!");
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
