import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { KlubModule } from '../klub/klub.module';
import { SezonaModule } from '../sezona/sezona.module';
import { SharedModule } from '../shared/shared.module';
import { UtakmicaModule } from '../utakmica/utakmica.module';
import { PrijavaComponent } from './prijava/prijava.component';

@NgModule({
    imports: [
        SharedModule,
        MatDialogModule,
        ToastrModule.forRoot()
    ],
    exports: [],
    declarations: [
        PrijavaComponent
    ],
    entryComponents: [
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }]
})
export class KorisnikModule { }