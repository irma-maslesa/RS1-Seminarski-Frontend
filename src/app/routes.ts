import { Routes } from '@angular/router';
import { IgracListComponent } from './pages/igrac/igrac-list/igrac-list.component';
import { IgracOverviewComponent } from './pages/igrac/igrac-overview/igrac-overview.component';
import { KlubOverviewComponent } from './pages/klub/klub-overview/klub-overview.component';
import { KlubSearchComponent } from './pages/klub/klub-search/klub-search.component';
import { OdjavaComponent } from './pages/korisnik/odjava/odjava.component';
import { PrijavaComponent } from './pages/korisnik/prijava/prijava.component';
import { LigaHomeComponent } from './pages/liga/liga-home.component';
import { LigaListComponent } from './pages/liga/liga-list/liga-list.component';
import { LigaOverviewComponent } from './pages/liga/liga-overview/liga-overview.component';
import { StadionSearchComponent } from './pages/stadion/stadion-search/stadion-search.component';
import { StatistikaAddEditFormComponent } from './pages/statistika/statistika-add-edit-form/statistika-add-edit-form.component';
import { StatistikaOverviewComponent } from './pages/statistika/statistika-overview/statistika-overview.component';
import { TrenerAddEditFormComponent } from './pages/trener/trener-add-edit-form/trener-add-edit-form.component';
import { TrenerSearchComponent } from './pages/trener/trener-search/trener-search.component';
import { UtakmicaListComponent } from './pages/utakmica/utakmica-search/utakmica-list/utakmica-list.component';
import { UtakmicaSearchComponent } from './pages/utakmica/utakmica-search/utakmica-search.component';


export const appRoutes: Routes = [
    { path: 'trener', component: TrenerSearchComponent },
    { path: 'trener-add', component: TrenerAddEditFormComponent },
    { path: 'stadion', component: StadionSearchComponent },
    { path: 'home', component: LigaHomeComponent },
    { path: 'liga', component: LigaListComponent },
    { path: 'liga/:id', component: LigaOverviewComponent },
    { path: 'klubb', component: KlubSearchComponent },
    { path: 'klub/:id', component: KlubOverviewComponent },
    { path: 'utakmica', component: UtakmicaSearchComponent },
    { path: 'utakmicaKO', component: UtakmicaListComponent, data: { omiljene: true } },
    { path: 'utakmicaA', component: UtakmicaListComponent },
    { path: 'utakmica/:id', component: StatistikaOverviewComponent },
    { path: 'utakmica/:id/statistika', component: StatistikaAddEditFormComponent },
    { path: 'igrac', component: IgracListComponent, data: { statistika: true } },
    { path: 'igrac/:id', component: IgracOverviewComponent },
    { path: 'prijava', component: PrijavaComponent },
    { path: 'odjava', component: OdjavaComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]