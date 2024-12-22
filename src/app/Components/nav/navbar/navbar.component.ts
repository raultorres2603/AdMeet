import {Component, inject} from '@angular/core';
import {Iauthservice} from '../../../Interfaces/iauthservice';
import {AuthService} from '../../../Services/auth/auth.service';
import {Router, RouterLink} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBars, faCircleUser, faSignOut} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private authService: Iauthservice = inject(AuthService)
  private router: Router = inject(Router)
  protected readonly faBars = faBars
  protected readonly faCircleUser = faCircleUser;


  logOut(): void {
    this.authService.logOut();
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  protected readonly faSignOut = faSignOut;
}
