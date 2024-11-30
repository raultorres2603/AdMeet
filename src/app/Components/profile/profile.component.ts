import {Component, inject} from '@angular/core';
import {Input} from '@angular/core';
import {Iuser} from '../../Interfaces/iuser';
import {CommonModule} from '@angular/common';
import {UserService} from '../../Services/user/user.service';
import {Iuserservice} from '../../Interfaces/iuserservice';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  @Input() userInfo!: Iuser;

  private userService: Iuserservice = inject(UserService);

  updateProp(key: string, element: Event) {
    this.userService.updateKeyValue(key, (element.target as HTMLInputElement).value);
  }

  updateProfile() {
    this.userService.updateInfoOnDb(this.userService.getUser());
  }

}
