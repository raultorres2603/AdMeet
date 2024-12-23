import {Component, inject, signal, WritableSignal} from '@angular/core';
import {Iauthservice} from '../../../Interfaces/iauthservice';
import {AuthService} from '../../../Services/auth/auth.service';
import {Router, RouterLink} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faBars, faCircleUser, faSignOut} from '@fortawesome/free-solid-svg-icons';
import {Drawer} from 'primeng/drawer';


@Component({
    selector: 'app-navbar',
    imports: [FontAwesomeModule, RouterLink, Drawer],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    private authService: Iauthservice = inject(AuthService)
    private router: Router = inject(Router)
    protected readonly faCircleUser = faCircleUser;
    protected readonly faSignOut = faSignOut;
    protected readonly faBars = faBars;
    protected visible: WritableSignal<boolean> = signal(false)


    logOut(): void {
        this.authService.logOut();
    }

    goToProfile(): void {
        this.router.navigate(['/profile']);
    }

    changeVisible(): void {
        this.visible.set(!this.visible());
    }
}
