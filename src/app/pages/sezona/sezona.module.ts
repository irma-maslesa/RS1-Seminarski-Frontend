import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmModal } from '../shared/confirm-modal/confirm.modal';
import { SharedModule } from '../shared/shared.module';
import { SezonaAddEditFormComponent } from './sezona-add-edit-form/sezona-add-edit-form.component';
import { SezonaListElementComponent } from './sezona-list/sezona-list-element/sezona-list-element.component';
import { SezonaListComponent } from './sezona-list/sezona-list.component';


@NgModule({
    imports: [
        SharedModule,
        MatDialogModule,
        MatIconModule,
        ToastrModule.forRoot()
    ],
    exports: [
        SezonaListComponent
    ],
    declarations: [
        SezonaListElementComponent,
        SezonaListComponent,
        SezonaAddEditFormComponent
    ],
    entryComponents: [
        ConfirmModal,
        SezonaAddEditFormComponent
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
})
export class SezonaModule { }