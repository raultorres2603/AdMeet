import {Iprofile} from './iprofile';

export interface Iuser {
  email: string;
  password: string;
  isAdmin: boolean
  profile?: Iprofile
}
