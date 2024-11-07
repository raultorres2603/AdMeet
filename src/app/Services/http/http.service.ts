import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ihttp} from '../../Interfaces/ihttp';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements Ihttp {

  private domain = "https://localhost:7149";

  constructor(private http: HttpClient) {

  }
   get(url: string): Observable<any> {
    return this.http.get(`${this.domain}/${url}`);
  }

   post(url: string, data: any): Observable<any> {
    console.log(this.domain, url)
    return this.http.post(`${this.domain}/${url}`, data);
  }

   delete(url: string): Observable<any> {
    return this.http.delete(`${this.domain}/${url}`);
  }

   put(url: string, data: any): Observable<any> {
    return this.http.put(`${this.domain}/${url}`, data);
  }

}
