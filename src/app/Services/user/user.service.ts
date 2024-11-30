import {inject, Injectable, signal} from '@angular/core';
import {Iuser} from '../../Interfaces/iuser';
import {Iuserservice} from '../../Interfaces/iuserservice';
import {HttpService} from '../http/http.service';
import {Ihttp} from '../../Interfaces/ihttp';
import {AuthService} from '../auth/auth.service';
import {Iauthservice} from '../../Interfaces/iauthservice';

@Injectable({
  providedIn: 'root'
})
export class UserService implements Iuserservice {
  private user = signal<Iuser>({
    email: '',
    password: '',
    name: '',
    lastName: '',
    zipCode: '',
    city: '',
    country: ''
  });

  private http: Ihttp = inject(HttpService);
  private authService: Iauthservice = inject(AuthService);


  getEmail(): string {
    return this.user().email;
  }

  getPassword(): string {
    return this.user().password;
  }

  updateInfo(vUser: Iuser): void {
    this.user.update(u => ({
      ...u,
      ...vUser
    }));
    console.log(this.user());
  }

  updateInfoOnDb(): void {
    this.http.put(`api/user/${this.authService.getToken()}/update`, this.user()).subscribe({
      next: () => {
        console.log('Updated');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getUser(): Iuser {
    return this.user();
  }

  logOut(): void {
    this.user.update(_ => ({
      email: '',
      password: '',
      name: '',
      lastName: '',
      zipCode: '',
      city: '',
      country: ''
    }));
    console.log(this.user());
  }

  toString(): string {
    return `${this.getEmail()} - ${this.getPassword()}`;
  }

  updateKeyValue(key: string, value: string): void {
    this.user.update(u => ({
      ...u,
      [key]: value
    }));
  }
}
