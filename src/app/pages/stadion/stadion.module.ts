import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { GradAddFormComponent } from '../grad/grad-add-form/grad-add-form.component';
import { SharedModule } from '../shared/shared.module';
import { StadionAddEditFormComponent } from './stadion-add-edit-form/stadion-add-edit-form.component';
import { StadionListElementComponent } from './stadion-search/stadion-list/stadion-list-element/stadion-list-element.component';
import { StadionListComponent } from './stadion-search/stadion-list/stadion-list.component';
import { StadionSearchFormComponent } from './stadion-search/stadion-search-form/stadion-search-form.component';
import { StadionSearchComponent } from './stadion-search/stadion-search.component';


@NgModule({
    imports: [
        SharedModule,
        MatDialogModule,
        ToastrModule.forRoot()
    ],
    exports: [],
    declarations: [
        StadionAddEditFormComponent,
        StadionListElementComponent,
        StadionListComponent,
        StadionSearchFormComponent,
        StadionSearchComponent
    ],
    entryComponents: [
        StadionAddEditFormComponent,
        GradAddFormComponent
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
})
export class StadionModule { }