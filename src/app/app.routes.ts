import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
export const routes: Routes = [
    {
        path:'login',
        loadComponent:() =>import ('./business/authentication/login/login.component')
    },
    { path: '', component: LandingComponent }
];
