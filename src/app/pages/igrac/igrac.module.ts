import { NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ConfirmModal } from '../shared/confirm-modal/confirm.modal';
import { SharedModule } from '../shared/shared.module';
import { StatistikaModule } from '../statistika/statistika.module';
import { IgracListComponent } from './igrac-list/igrac-list.component';
import { IgracOverviewComponent } from './igrac-overview/igrac-overview.component';

@NgModule({
    imports: [
        SharedModule,
        MatIconModule,
        MatTabsModule,
        StatistikaModule
    ],
    exports: [
        IgracListComponent
    ],
    declarations: [
        IgracListComponent,
        IgracOverviewComponent
    ],
    entryComponents: [
        ConfirmModal
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
})
export class IgracModule { }