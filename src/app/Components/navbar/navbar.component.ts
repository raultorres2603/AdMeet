import {Component, inject} from '@angular/core';
import {Iauthservice} from '../../Interfaces/iauthservice';
import {AuthService} from '../../Services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private authService: Iauthservice = inject(AuthService)

  logOut(): void {
    this.authService.logOut();
  }
}
