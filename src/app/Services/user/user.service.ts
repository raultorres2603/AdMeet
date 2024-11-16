import {Injectable} from '@angular/core';
import {Iuser} from '../../Interfaces/iuser';
import {Iuserservice} from '../../Interfaces/iuserservice';

@Injectable({
  providedIn: 'root'
})
export class UserService implements Iuserservice {
  private readonly user: Iuser

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

  private setEmail(email: string): void {
    this.user.Email = email;
  }

  private setPassword(password: string): void {
    this.user.Password = password;
  }

  toString(): string {
    return JSON.stringify(this.user);
  }

  updateInfo(user: Iuser): string {
    this.setEmail(user.Email);
    this.setPassword(user.Password);
    return this.toString();
  }

}
