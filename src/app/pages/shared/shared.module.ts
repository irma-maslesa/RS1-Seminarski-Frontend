import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfirmModal } from './confirm-modal/confirm.modal';
import { RestApiService } from './rest-api.service';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        RouterModule,
        CommonModule,
        MatIconModule,
        BrowserAnimationsModule,
        AngularMultiSelectModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        MatIconModule,
        BrowserAnimationsModule,
        AngularMultiSelectModule
    ],
    entryComponents: [
        ConfirmModal
    ],
    declarations: [],
    providers: [
        RestApiService,
        ToastrService
    ],
})
export class SharedModule { }
