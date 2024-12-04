import {Iuser} from './iuser';

export interface Iuserservice {

  updateInfo(user: Iuser): void

  logOut(): void

  getUser(): Iuser

  updateKeyValue(key: string, value: string): void

}
