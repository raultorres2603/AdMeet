import {Component, inject} from '@angular/core';
import {Iuser} from '../../../Interfaces/iuser';
import {AuthService} from '../../../Services/auth/auth.service';
import {Iauthservice} from '../../../Interfaces/iauthservice';
import {UserService} from '../../../Services/user/user.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {faHouse} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  imports: [NavbarComponent, FontAwesomeModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent {

  public userInfo: Iuser = inject(UserService).getUser();

  private authService: Iauthservice = inject(AuthService)

  private router: Router = inject(Router)

  protected readonly faHouse = faHouse;


  onInputChange(event: Event, propName: string): void {
    const inputElement = event.target as HTMLInputElement;
    this.userInfo.profile![propName] = inputElement.value;
  }

  saveProfile(): void {
    this.authService.updateInfoOnDb(this.userInfo);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
