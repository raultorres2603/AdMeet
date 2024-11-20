import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {Iauthservice} from '../../Interfaces/iauthservice';
import {AuthService} from '../../Services/auth/auth.service';
import {UserService} from '../../Services/user/user.service';
import {Iuserservice} from '../../Interfaces/iuserservice';
import {HttpService} from '../../Services/http/http.service';
import {Ihttp} from '../../Interfaces/ihttp';

@Component({
    selector: 'app-root',
    imports: [NavbarComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private authService: Iauthservice = inject(AuthService)
  private userService: Iuserservice = inject(UserService);
  private http: Ihttp = inject(HttpService)

  ngOnInit(): void {
    console.log("Auth done");
    this.http.get(`api/user/${this.authService.getToken()}/get`).subscribe({
      next: (response) => {
        this.userService.updateInfo(response);
        console.log(this.userService.toString());
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
