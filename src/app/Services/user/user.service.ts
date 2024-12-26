import {Injectable, signal, WritableSignal} from '@angular/core';
import {Iuser} from '../../Interfaces/iuser';
import {Iuserservice} from '../../Interfaces/iuserservice';

@Injectable({
  providedIn: 'root'
})
export class UserService implements Iuserservice {
  private user: WritableSignal<Iuser> = signal<Iuser>({
    email: '',
    password: '',
    isAdmin: false,
    profile: {
      name: '',
      lastName: '',
      city: '',
      country: '',
      zipCode: '',
      gender: '',
      birthday: '',
      preferences: '',
    }
  });

  updateInfo(vUser: Iuser): void {
    this.user.update(u => ({
      ...u,
      ...vUser
    }));
  }

  getUser(): Iuser {
    return this.user();
  }

  logOut(): void {
    this.user.update(_ => ({
      email: '',
      password: '',
      isAdmin: false,
      profile: {}
    }));
  }

  updateKeyValue(key: string, value: string): void {
    this.user.update(u => ({
      ...u,
      profile: {
        ...u.profile,
        [key]: value
      }
    }));
  }
}
