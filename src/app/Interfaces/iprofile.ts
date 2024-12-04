export interface Iprofile {
  name?: string;
  lastName?: string;
  zipCode?: string;
  city?: string;
  country?: string;

  // Otros campos del perfil
  gender?: string;
  birthday?: string;
  preferences?: string;

  [key: string]: string | undefined;
}
