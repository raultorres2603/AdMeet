import {Component, inject} from '@angular/core';
import {ILoginComp} from '../../Interfaces/ilogin-comp';
import {Iauthservice} from '../../Interfaces/iauthservice';
import {AuthService} from '../../Services/auth/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements ILoginComp {
  private Email: string = '';
  private Password: string = '';
  private authService: Iauthservice = inject(AuthService);

  onInputChange(event: Event): void {
    switch ((event.target as HTMLInputElement).id) {
      case 'Email':
        this.Email =(event.target as HTMLInputElement).value;
        break;
      case 'Password':
        this.Password = (event.target as HTMLInputElement).value;
        break;
    }
  }

   logIn(): void {
    this.authService.logIn({
      Email: this.Email,
      Password: this.Password
    });
  }

}
