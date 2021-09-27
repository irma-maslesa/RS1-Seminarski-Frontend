import { Routes } from '@angular/router';
import { KlubSearchComponent } from './pages/klub/klub-search/klub-search.component';
import { OdjavaComponent } from './pages/korisnik/odjava/odjava.component';
import { PrijavaComponent } from './pages/korisnik/prijava/prijava.component';
import { LigaHomeComponent } from './pages/liga/liga-home.component';
import { LigaListComponent } from './pages/liga/liga-list/liga-list.component';
import { LigaOverviewComponent } from './pages/liga/liga-overview/liga-overview.component';
import { StadionSearchComponent } from './pages/stadion/stadion-search/stadion-search.component';
import { TrenerAddEditFormComponent } from './pages/trener/trener-add-edit-form/trener-add-edit-form.component';
import { TrenerSearchComponent } from './pages/trener/trener-search/trener-search.component';
import { UtakmicaSearchComponent } from './pages/utakmica/utakmica-search/utakmica-search.component';


export const appRoutes: Routes = [
    { path: 'trener', component: TrenerSearchComponent },
    { path: 'trener-add', component: TrenerAddEditFormComponent },
    { path: 'stadion', component: StadionSearchComponent },
    { path: 'home', component: LigaHomeComponent },
    { path: 'liga', component:LigaListComponent},
    { path: 'liga/:id', component: LigaOverviewComponent },
    { path: 'klub', component: KlubSearchComponent },
    { path: 'utakmica', component: UtakmicaSearchComponent },
    { path: 'prijava', component: PrijavaComponent },
    { path: 'odjava', component: OdjavaComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]