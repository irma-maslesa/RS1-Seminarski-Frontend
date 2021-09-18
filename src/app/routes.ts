import { Routes } from '@angular/router';
import { KlubSearchComponent } from './pages/klub/klub-search/klub-search.component';
import { LigaHomeComponent } from './pages/liga/liga-home.component';
import { LigaOverviewComponent } from './pages/liga/liga-overview/liga-overview.component';
import { StadionSearchComponent } from './pages/stadion/stadion-search/stadion-search.component';
import { TrenerAddEditFormComponent } from './pages/trener/trener-add-edit-form/trener-add-edit-form.component';
import { TrenerSearchComponent } from './pages/trener/trener-search/trener-search.component';


export const appRoutes: Routes = [
    { path: 'trener', component: TrenerSearchComponent },
    { path: 'trener-add', component: TrenerAddEditFormComponent },
    { path: 'stadion', component: StadionSearchComponent },
    { path: 'liga', component: LigaHomeComponent },
    { path: 'liga/:id', component: LigaOverviewComponent },
    { path: 'klub', component: KlubSearchComponent },
    { path: '', redirectTo: '/liga', pathMatch: 'full' }
]