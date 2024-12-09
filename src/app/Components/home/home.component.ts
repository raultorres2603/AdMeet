import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {Iauthservice} from '../../Interfaces/iauthservice';
import {AuthService} from '../../Services/auth/auth.service';
import {UserService} from '../../Services/user/user.service';
import {Iuserservice} from '../../Interfaces/iuserservice';
import {HttpService} from '../../Services/http/http.service';
import {Ihttp} from '../../Interfaces/ihttp';
import {Iuser} from '../../Interfaces/iuser';
import {ProfileEditComponent} from '../edit-profile/profile-edit.component';
import {CommonModule} from '@angular/common';

interface Iresponse {
  user: Iuser,
  newTok: string
}

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, ProfileEditComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  private authService: Iauthservice = inject(AuthService);
  private userService: Iuserservice = inject(UserService);
  private http: Ihttp = inject(HttpService);
  public userInfo: WritableSignal<Iuser> = signal<Iuser>(this.userService.getUser());

  ngOnInit(): void {
    console.log("Auth done");
    this.http.get(`api/user/${this.authService.getToken()}/get`).subscribe({
      next: (response: Iresponse) => {
        this.userService.updateInfo(response.user);
        this.userInfo.set(this.userService.getUser());
        this.authService.updateToken(response.newTok);
      },
      error: (_) => {
        this.authService.logOut();
      }
    })
  }

}
