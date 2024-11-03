import {Iauthservice} from './iauthservice';

export interface ILoginComp {
  Email: string;
  Password: string;
  authService: Iauthservice;
  onInputChange(event: Event): void;
  logIn(): void;
}
