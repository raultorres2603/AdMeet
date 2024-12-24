import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from '../Services/user/user.service';

export const adminGuard: CanActivateFn = (_): boolean => {
  return inject(UserService).getUser().isAdmin;
};
