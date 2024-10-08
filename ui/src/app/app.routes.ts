import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { MainComponent } from './layout/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/address/create/create.component';
import { EditComponent } from './pages/address/edit/edit.component';
import { CreateComponent as CreateUserComponent } from './pages/auth/create/create.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
export const routes: Routes = [
    {
        path: '',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: CreateUserComponent
    },
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'address/new',
                component: CreateComponent
            },
            {
                path: 'address/edit/:id',
                component: EditComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    }
];
