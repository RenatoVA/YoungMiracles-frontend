import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home/home.component';
import {authInverseGuard} from './core/guards/auth-inverse.guard';
export const routes: Routes = [
    {
        path:'login',
        loadComponent:() =>import ('./pages/auth/login/login.component'),canActivate:[authInverseGuard]
    },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: '', component: LandingComponent },
];
