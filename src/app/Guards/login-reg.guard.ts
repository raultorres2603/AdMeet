import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../Services/auth/auth.service';

export const loginRegGuard: CanActivateFn = (): boolean => {
  if (inject(AuthService).isAuthenticated()) {
    inject(Router).navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
