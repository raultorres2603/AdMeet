import { Routes } from '@angular/router';
import {HomeComponent} from './Components/home/home.component';
import {authGuard} from './Guards/auth.guard';
import {LoginComponent} from './Components/login/login.component';
import {loginRegGuard} from './Guards/login-reg.guard';

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
    path: '**',
    redirectTo: 'login' // Redirige rutas no encontradas
  }
];
