import {Iuser} from './iuser';

export interface Iauthservice {
  isAuthenticated(): boolean;
  getToken(): string | null;
  setToken(newToken: string): void
  logIn(user: Iuser): void
}
