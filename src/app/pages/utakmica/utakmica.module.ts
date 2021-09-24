import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmModal } from '../shared/confirm-modal/confirm.modal';
import { SharedModule } from '../shared/shared.module';
import { UtakmicaListComponent } from './utakmica-list/utakmica-list.component';


@NgModule({
    imports: [
        SharedModule,
        MatDialogModule,
        MatIconModule,
        ToastrModule.forRoot()
    ],
    exports: [
        UtakmicaListComponent
    ],
    declarations: [
        UtakmicaListComponent
    ],
    entryComponents: [
        ConfirmModal
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
})
export class UtakmicaModule { }