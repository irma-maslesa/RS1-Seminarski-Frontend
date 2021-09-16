import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StadionListComponent } from './pages/stadion/stadion-search/stadion-list/stadion-list.component';
import { TrenerAddEditFormComponent } from './pages/trener/trener-add-edit-form/trener-add-edit-form.component';
import { TrenerSearchComponent } from './pages/trener/trener-search/trener-search.component';


export const appRoutes: Routes = [
    { path: 'trener', component: TrenerSearchComponent },
    { path: 'trener-add', component: TrenerAddEditFormComponent },
    { path: 'stadion', component: StadionListComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]