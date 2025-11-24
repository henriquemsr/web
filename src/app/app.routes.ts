import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(c => c.Login)
    },
    {
        path: "dash",
        loadComponent: () => import('./components/dahsboard/dahsboard').then(c => c.Dahsboard),
        canActivate: [authGuard]
    }
];
