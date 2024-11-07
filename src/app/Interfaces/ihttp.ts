import {Observable} from 'rxjs';

export interface Ihttp {

  get(url: string): Observable<any>

  post(url: string, data: any): Observable<any>

  delete(url: string): Observable<any>

  put(url: string, data: any): Observable<any>
}
