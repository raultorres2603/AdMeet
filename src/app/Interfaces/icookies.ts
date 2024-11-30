export interface Icookies {
  set(key: string, value: string): void;

  get(key: string): string;

  delete(key: string): void;
}
