import {Injectable} from '@angular/core';
import {Iuser} from '../../Interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: Iuser

  constructor() {
    this.user = {
      Email: '',
      Password: ''
    }
  }

  getEmail(): string {
    return this.user.Email;
  }

  getPassword(): string {
    return this.user.Password;
  }

  setEmail(email: string): void {
    this.user.Email = email;
  }

  setPassword(password: string): void {
    this.user.Password = password;
  }
}
