import {Routes} from '@angular/router';
import {HomeComponent} from './Components/home-page/home/home.component';
import {authGuard} from './Guards/auth.guard';
import {LoginComponent} from './Components/login/login.component';
import {loginRegGuard} from './Guards/login-reg.guard';
import {RegisterComponent} from './Components/register/register.component';
import {ProfileEditComponent} from './Components/nav/edit-profile/profile-edit.component';
import {adminGuard} from './Guards/admin.guard';
import {KpiDashboardComponent} from './admin/kpi-dashboard/kpi-dashboard.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [loginRegGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [loginRegGuard],
  },
  {
    path: 'profile',
    component: ProfileEditComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: 'kpi',
        component: KpiDashboardComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login' // Redirige rutas no encontradas
  }
];
