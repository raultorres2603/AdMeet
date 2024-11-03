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
  token: string = sessionStorage.getItem('MUT') || '';
  toaster: ToastrService = inject(ToastrService);
  http: Ihttp = inject(HttpService)
  router: Router = inject(Router);

  constructor() {
  }

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
        this.toaster.success('Login Success');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toaster.error('Login Failed');
        console.log(err);
      }
    });
  }
}
