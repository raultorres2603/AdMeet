import {Injectable, signal} from '@angular/core';
import {Iuser} from '../../Interfaces/iuser';
import {Iuserservice} from '../../Interfaces/iuserservice';

@Injectable({
  providedIn: 'root'
})
export class UserService implements Iuserservice {
  private user = signal<Iuser>({
    email: '',
    password: ''
  });


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

  logOut(): void {
    this.user.update(_ => ({
      email: '',
      password: ''
    }));
    console.log(this.user());
  }

  toString(): string {
    return `${this.getEmail()} - ${this.getPassword()}`;
  }
}
