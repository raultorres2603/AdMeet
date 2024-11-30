import {inject, Injectable} from '@angular/core';
import {Iauthservice} from '../../Interfaces/iauthservice';
import {ToastrService} from 'ngx-toastr';
import {Iuser} from '../../Interfaces/iuser';
import {HttpService} from '../http/http.service';
import {Ihttp} from '../../Interfaces/ihttp';
import {Router} from '@angular/router';
import {Iuserservice} from '../../Interfaces/iuserservice';
import {UserService} from '../user/user.service';
import {Icookies} from '../../Interfaces/icookies';
import {CookiesAmService} from '../cookies-am/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements Iauthservice {
  private cookieService: Icookies = inject(CookiesAmService);
  private toaster: ToastrService = inject(ToastrService);
  private userService: Iuserservice = inject(UserService)
  private http: Ihttp = inject(HttpService)
  private router: Router = inject(Router);

  private setToken(newToken: string): void {
    this.cookieService.set('MUT', newToken);
  }

  public getToken(): string {
    return this.cookieService.get('MUT');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
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

  updateInfoOnDb(user: Iuser): void {
    this.http.put(`api/user/${this.getToken()}/update`, user).subscribe({
      next: () => {
        this.toaster.success('Actualizado', 'Información actualizada');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toaster.error('Error en actualización', 'Error');
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
    this.cookieService.delete('MUT');
    this.userService.logOut();
    this.router.navigate(['/login']);
  }

  public updateToken(newToken: string): void {
    this.setToken(newToken);
  }
}
