import {Iuser} from './iuser';

export interface Iuserservice {
    getEmail(): string;

    getPassword(): string;

    toString(): string;

    updateInfo(user: Iuser): void
}
