import {Iuser} from './iuser';

export interface Iauthservice {
  isAuthenticated(): boolean;

  getToken(): string | null;

  logIn(user: Iuser): void

  register(user: Iuser): void

  logOut(): void

  updateToken(newToken: string): void
}
