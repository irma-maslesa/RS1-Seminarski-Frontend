import { Routes } from '@angular/router';

import { FranchiseComponent } from './pages/franchise/franchise.component';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Routes = [
    { path: 'franchise', component: FranchiseComponent },
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]