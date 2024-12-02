export interface Iprofile {
  name?: string;
  lastName?: string;
  zipCode?: string;
  city?: string;
  country?: string;

  [key: string]: string | undefined;
}
