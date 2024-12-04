import {Iprofile} from './iprofile';

export interface Iuser {
  email: string;
  password: string;
  profile?: Iprofile
}
