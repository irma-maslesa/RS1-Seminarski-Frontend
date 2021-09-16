import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { GradAddFormComponent } from './grad-add-form/grad-add-form.component';

@NgModule({
    imports: [
        SharedModule,
        MatDialogModule,
        ToastrModule.forRoot()
    ],
    exports: [],
    declarations: [
        GradAddFormComponent
    ],
    entryComponents: [
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }]
})
export class GradModule { }