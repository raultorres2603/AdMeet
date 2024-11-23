import {Component, inject} from '@angular/core';
import {Iauthservice} from '../../Interfaces/iauthservice';
import {AuthService} from '../../Services/auth/auth.service';
import {IniTitleComponent} from '../ini-title/ini-title.component';

@Component({
  selector: 'app-register',
  imports: [
    IniTitleComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private Email: string = '';
  private Password: string = '';
  private authService: Iauthservice = inject(AuthService);

  onInputChange(event: Event): void {
    switch ((event.target as HTMLInputElement).id) {
      case 'Email':
        this.Email = (event.target as HTMLInputElement).value;
        console.log(this.Email)
        break;
      case 'Password':
        this.Password = (event.target as HTMLInputElement).value;
        console.log(this.Password)
        break;
    }
  }

  register() {
    this.authService.register({
      email: this.Email,
      password: this.Password
    })
  }
}
