import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ToastrModule } from 'ngx-toastr';
import { IgracModule } from '../igrac/igrac.module';
import { ConfirmModal } from '../shared/confirm-modal/confirm.modal';
import { SharedModule } from '../shared/shared.module';
import { StadionAddEditFormComponent } from '../stadion/stadion-add-edit-form/stadion-add-edit-form.component';
import { StadionModule } from '../stadion/stadion.module';
import { TrenerAddEditFormComponent } from '../trener/trener-add-edit-form/trener-add-edit-form.component';
import { TrenerModule } from '../trener/trener.module';
import { UtakmicaModule } from '../utakmica/utakmica.module';
import { KlubAddEditFormComponent } from './klub-add-edit-form/klub-add-edit-form.component';
import { KlubOverviewComponent } from './klub-overview/klub-overview.component';
import { KlubPoredakComponent } from './klub-poredak/klub-poredak.component';
import { KlubListElementComponent } from './klub-search/klub-list/klub-list-element/klub-list-element.component';
import { KlubListComponent } from './klub-search/klub-list/klub-list.component';
import { KlubSearchFormComponent } from './klub-search/klub-search-form/klub-search-form.component';
import { KlubSearchComponent } from './klub-search/klub-search.component';
import { DatePipe } from '@angular/common';
import { StatistikaModule } from '../statistika/statistika.module';


@NgModule({
    imports: [
        SharedModule,
        MatDialogModule,
        ToastrModule.forRoot(),
        TrenerModule,
        StadionModule,
        MatTabsModule,
        UtakmicaModule,
        IgracModule,
        StatistikaModule
    ],
    exports: [
        KlubListComponent,
        KlubPoredakComponent
    ],
    declarations: [
        KlubListElementComponent,
        KlubListComponent,
        KlubAddEditFormComponent,
        KlubSearchFormComponent,
        KlubSearchComponent,
        KlubOverviewComponent,
        KlubPoredakComponent
    ],
    entryComponents: [
        TrenerAddEditFormComponent,
        StadionAddEditFormComponent,
        KlubAddEditFormComponent,
        ConfirmModal
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        DatePipe
    ]
})
export class KlubModule { }