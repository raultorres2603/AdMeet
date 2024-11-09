import {inject, Injectable} from '@angular/core';
import {Iauthservice} from '../../Interfaces/iauthservice';
import {ToastrService} from 'ngx-toastr';
import {Iuser} from '../../Interfaces/iuser';
import {HttpService} from '../http/http.service';
import {Ihttp} from '../../Interfaces/ihttp';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements Iauthservice {
  private token: string = sessionStorage.getItem('MUT') || '';
  private toaster: ToastrService = inject(ToastrService);
  private http: Ihttp = inject(HttpService)
  private router: Router = inject(Router);

  public setToken(newToken: string): void {
    this.token = newToken;
    sessionStorage.setItem('MUT', this.token);
  }

  public getToken(): string {
    return this.token;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public logIn(user: Iuser): void {
    const login = this.http.post('api/user/login', user);
    login.subscribe({
      next: (response: string) => {
        this.setToken(response);
        this.toaster.success('Entrando', 'Login correcto');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toaster.error('Error en login', 'Error');
        console.log(err);
      }
    });
  }

  public register(user: Iuser): void {
    const register = this.http.post('api/user/register', user);
    register.subscribe({
      next: () => {
        this.toaster.success('Registrado', 'Usuario creado');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toaster.error('Error en registro', 'Error');
        console.log(err);
      }
    });
  }

  public logOut(): void {
    this.token = '';
    sessionStorage.removeItem('MUT');
    this.router.navigate(['/login']);
  }
}
