import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'login',
        loadComponent:() =>import ('./business/authentication/login/login.component')
    }
];
