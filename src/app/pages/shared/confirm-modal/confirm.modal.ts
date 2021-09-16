import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm.modal.html',
  styleUrls: ['./confirm.modal.scss']
})
export class ConfirmModal implements OnInit {
  @Output() confirmEmitter = new EventEmitter();

  naziv: string;

  constructor(
    private dialogRef: MatDialogRef<ConfirmModal>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.naziv = this.data.naziv;
  }

  confirm() {
    this.dialogRef.close("YES");
  }

  cancel() {
    this.dialogRef.close();
  }
}
