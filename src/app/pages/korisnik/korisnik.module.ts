import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { OdjavaComponent } from './odjava/odjava.component';
import { PrijavaComponent } from './prijava/prijava.component';

@NgModule({
    imports: [
        SharedModule,
        MatDialogModule,
        ToastrModule.forRoot()
    ],
    exports: [],
    declarations: [
        PrijavaComponent,
        OdjavaComponent
    ],
    entryComponents: [
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }]
})
export class KorisnikModule { }