import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home/home.component';
import {authInverseGuard} from './core/guards/auth-inverse.guard';
import { VoluntarioHomeComponent } from './pages/home/voluntario-home/voluntario-home.component';
import { ScheduleSessionComponent } from './pages/home/schedule-session/schedule-session.component';

export const routes: Routes = [
    {
        path:'login',
        loadComponent:() =>import ('./pages/auth/login/login.component'),canActivate:[authInverseGuard]
    },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'voluntario-home', component: VoluntarioHomeComponent, canActivate: [authGuard] },
    { path: '', component: LandingComponent },
    {
        path:'register',
        loadComponent:() =>import ('./pages/auth/register/register.component'),canActivate:[authInverseGuard]
    },
    { path: 'schedule-session', component: ScheduleSessionComponent }
];
