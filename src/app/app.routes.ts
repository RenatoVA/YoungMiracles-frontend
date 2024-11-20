import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LandingComponent } from './pages/landing/landing.component';
import {authInverseGuard} from './core/guards/auth-inverse.guard';

export const routes: Routes = [
    {
        path:'login',
        loadComponent:() =>import ('./pages/auth/login/login.component'),canActivate:[authInverseGuard]
    },
    { path: 'home', loadChildren: () =>import('./pages/home/home.routes').then((a) => a.homeRoutes), canActivate: [authGuard] },
    { path: '', component: LandingComponent,canActivate:[authInverseGuard] },
    {
        path:'register',
        loadComponent:() =>import ('./pages/auth/register/register.component'),canActivate:[authInverseGuard]
    },
    {
        path:'pay',
        loadChildren:() =>import ('./pages/pay/pay.routes').then((a) => a.payRoutes),canActivate:[authGuard]
    }
];
