import {Iuser} from './iuser';

export interface Iauthservice {
  token: string;
  isAuthenticated(): boolean;
  getToken(): string | null;
  setToken(newToken: string): void
  logIn(user: Iuser): void
}
