import {Component, inject} from '@angular/core';
import {Iuser} from '../../Interfaces/iuser';
import {CommonModule} from '@angular/common';
import {UserService} from '../../Services/user/user.service';
import {Iuserservice} from '../../Interfaces/iuserservice';
import {AuthService} from '../../Services/auth/auth.service';
import {Iauthservice} from '../../Interfaces/iauthservice';

@Component({
    selector: 'app-profile',
    imports: [CommonModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent {

    private userService: Iuserservice = inject(UserService);
    private authService: Iauthservice = inject(AuthService);
    public userInfo: Iuser = this.userService.getUser();
    public profileSetted = false;

    updateProp(key: string, element: Event) {
        this.userService.updateKeyValue(key, (element.target as HTMLInputElement).value);
        this.userInfo = this.userService.getUser();
        console.log(this.userService.getUser())
    }

    updateProfile() {
        console.log(this.userService.getUser())
        this.authService.updateInfoOnDb(this.userService.getUser());
        this.userInfo = this.userService.getUser();
        this.profileSetted = true;
    }

}
