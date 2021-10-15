import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmModal } from '../shared/confirm-modal/confirm.modal';
import { SharedModule } from '../shared/shared.module';
import { StatistikaAddEditFormComponent } from './statistika-add-edit-form/statistika-add-edit-form.component';
import { StatistikaIgracAddEditFormComponent } from './statistika-igrac/statistika-igrac-add-edit-form/statistika-igrac-add-edit-form.component';
import { StatistikaIgracOverviewComponent } from './statistika-igrac/statistika-igrac-overview/statistika-igrac-overview.component';
import { StatistikaSezonaIgracOverviewComponent } from './statistika-igrac/statistika-sezona-igrac-overview/statistika-sezona-igrac-overview.component';
import { StatistikaUtakmicaIgracOverviewComponent } from './statistika-igrac/statistika-utakmica-igrac-overview/statistika-utakmica-igrac-overview.component';
import { StatistikaKlubAddEditFormComponent } from './statistika-klub/statistika-klub-add-edit-form/statistika-klub-add-edit-form.component';
import { StatistikaSezonaKlubChartComponent } from './statistika-klub/statistika-sezona-klub-charts/statistika-sezona-klub-charts.component';
import { StatistikaSezonaKlubOverviewComponent } from './statistika-klub/statistika-sezona-klub-overview/statistika-sezona-klub-overview.component';
import { StatistikaOverviewComponent } from './statistika-overview/statistika-overview.component';
import { StatistikaPoredjenjeComponent } from './statistika-overview/statistika-poredjenje/statistika-poredjenje.component';

@NgModule({
    imports: [
        SharedModule,
        MatDialogModule,
        MatIconModule,
        ToastrModule.forRoot(),
        MatProgressBarModule,
        MatTabsModule,
        ChartsModule
    ],
    exports: [
        StatistikaUtakmicaIgracOverviewComponent,
        StatistikaSezonaIgracOverviewComponent,
        StatistikaSezonaKlubOverviewComponent,
        StatistikaSezonaKlubChartComponent
    ],
    declarations: [
        StatistikaAddEditFormComponent,
        StatistikaKlubAddEditFormComponent,
        StatistikaIgracAddEditFormComponent,
        StatistikaIgracOverviewComponent,
        StatistikaOverviewComponent,
        StatistikaPoredjenjeComponent,
        StatistikaUtakmicaIgracOverviewComponent,
        StatistikaSezonaIgracOverviewComponent,
        StatistikaSezonaKlubOverviewComponent,
        StatistikaSezonaKlubChartComponent
    ],
    entryComponents: [
        ConfirmModal
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ]
})
export class StatistikaModule { }