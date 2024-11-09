import {Component, inject} from '@angular/core';
import {Iauthservice} from '../../Interfaces/iauthservice';
import {AuthService} from '../../Services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
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
      Email: this.Email,
      Password: this.Password
    })
  }
}
