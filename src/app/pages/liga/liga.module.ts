import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { KlubModule } from '../klub/klub.module';
import { SezonaModule } from '../sezona/sezona.module';
import { SharedModule } from '../shared/shared.module';
import { LigaHomeComponent } from './liga-home.component';
import { LigaOverviewComponent } from './liga-overview/liga-overview.component';

@NgModule({
    imports: [
        SharedModule,
        MatDialogModule,
        ToastrModule.forRoot(),
        KlubModule,
        SezonaModule
    ],
    exports: [],
    declarations: [
        LigaHomeComponent,
        LigaOverviewComponent
    ],
    entryComponents: [
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }]
})
export class LigaModule { }