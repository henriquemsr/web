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
        loadComponent: () => import('./components/dashboard/dashboard').then(c => c.Dashboard),
        canActivate: [authGuard],
        children: [
             { path: "", redirectTo: "customer", pathMatch: "full" },
            {
                path: 'register',
                loadComponent: () => import('./components/login/register/register').then(c => c.Register)
            },
            {
                path: 'customer',
                loadComponent: () => import('./components/dashboard/customers/customers').then(c => c.Customers)
            },
            {
                path: "view-customer/:id",
                loadComponent: () => import('./components/dashboard/view-customer/view-customer').then(c => c.ViewCustomer)
            },
            {
                path: "tasks/:id",
                loadComponent: () => import('./components/dashboard/tasks/tasks').then(c => c.Tasks)
            },
            {
                path: "registercustomer",
                loadComponent: () => import('./components/dashboard/register-customer/register-customer').then(c => c.RegisterCustomer)
            },
            {
                path: "schedule",
                loadComponent: () => import('./components/dashboard/schedule/schedule').then(c => c.Schedule)
            },
            {
                path: "schedule-edit/:id",
                loadComponent: () => import('./components/dashboard/schedule-edit/schedule-edit').then(c => c.ScheduleEdit)
            }
        ]
    },

];
