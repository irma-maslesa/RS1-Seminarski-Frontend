import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RestApiService } from './rest-api.service';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmModal } from './confirm-modal/confirm.modal';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        RouterModule,
        CommonModule,
        MatIconModule,
        BrowserAnimationsModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CommonModule,
        MatIconModule,
        BrowserAnimationsModule
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
