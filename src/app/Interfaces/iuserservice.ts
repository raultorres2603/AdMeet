export interface Iuserservice {
  getEmail(): string;

  getPassword(): string;

  setEmail(email: string): void;

  setPassword(password: string): void;
}
