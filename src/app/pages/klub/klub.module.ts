import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmModal } from '../shared/confirm-modal/confirm.modal';
import { SharedModule } from '../shared/shared.module';
import { StadionAddEditFormComponent } from '../stadion/stadion-add-edit-form/stadion-add-edit-form.component';
import { TrenerAddEditFormComponent } from '../trener/trener-add-edit-form/trener-add-edit-form.component';
import { KlubAddEditFormComponent } from './klub-add-edit-form/klub-add-edit-form.component';
import { KlubListElementComponent } from './klub-search/klub-list/klub-list-element/klub-list-element.component';
import { KlubListComponent } from './klub-search/klub-list/klub-list.component';
import { KlubSearchFormComponent } from './klub-search/klub-search-form/klub-search-form.component';
import { KlubSearchComponent } from './klub-search/klub-search.component';

@NgModule({
    imports: [
        SharedModule,
        MatDialogModule,
        ToastrModule.forRoot()
    ],
    exports: [
        KlubListComponent
    ],
    declarations: [
        KlubListElementComponent,
        KlubListComponent,
        KlubAddEditFormComponent,
        KlubSearchFormComponent,
        KlubSearchComponent
    ],
    entryComponents: [
        TrenerAddEditFormComponent,
        StadionAddEditFormComponent,
        KlubAddEditFormComponent,
        ConfirmModal
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }]
})
export class KlubModule { }