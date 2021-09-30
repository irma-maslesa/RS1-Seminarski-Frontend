import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { TrenerAddEditFormComponent } from './trener-add-edit-form/trener-add-edit-form.component';
import { TrenerListElementComponent } from './trener-search/trener-list/trener-list-element/trener-list-element.component';
import { TrenerListComponent } from './trener-search/trener-list/trener-list.component';
import { TrenerSearchFormComponent } from './trener-search/trener-search-form/trener-search-form.component';
import { TrenerSearchComponent } from './trener-search/trener-search.component';


@NgModule({
    imports: [
        SharedModule,
        MatDialogModule,
        ToastrModule.forRoot()
    ],
    exports: [
        TrenerListElementComponent
    ],
    declarations: [
        TrenerListElementComponent,
        TrenerListComponent,
        TrenerSearchFormComponent,
        TrenerSearchComponent,
        TrenerAddEditFormComponent
    ],
    entryComponents: [
        TrenerAddEditFormComponent
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
})
export class TrenerModule { }