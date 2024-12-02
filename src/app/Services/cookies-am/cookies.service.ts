import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Icookies} from '../../Interfaces/icookies';

@Injectable({
  providedIn: 'root'
})
export class CookiesAmService implements Icookies {

  constructor(private cookieService: CookieService) {

  }

  get(key: string): string {
    return this.cookieService.get(key);
  }

  set(key: string, value: string): void {
    this.cookieService.set(key, value, {expires: 1});
  }

  delete(key: string): void {
    this.cookieService.delete(key);
  }
}
