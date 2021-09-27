import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { KlubModule } from '../klub/klub.module';
import { SezonaModule } from '../sezona/sezona.module';
import { SharedModule } from '../shared/shared.module';
import { UtakmicaModule } from '../utakmica/utakmica.module';
import { LigaAddEditFormComponent } from './liga-add-edit-form/liga-add-edit-form.component';
import { LigaHomeComponent } from './liga-home.component';
import { LigaListElementComponent } from './liga-list/liga-list-element/liga-list-element.component';
import { LigaListComponent } from './liga-list/liga-list.component';
import { LigaOverviewComponent } from './liga-overview/liga-overview.component';

@NgModule({
    imports: [
        SharedModule,
        MatDialogModule,
        ToastrModule.forRoot(),
        KlubModule,
        SezonaModule,
        UtakmicaModule
    ],
    exports: [],
    declarations: [
        LigaHomeComponent,
        LigaOverviewComponent,
        LigaListElementComponent,
        LigaListComponent,
        LigaAddEditFormComponent
    ],
    entryComponents: [
        LigaAddEditFormComponent
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }]
})
export class LigaModule { }