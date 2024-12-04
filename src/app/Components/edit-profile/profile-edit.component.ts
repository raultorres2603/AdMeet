import {Component, inject, Input, WritableSignal} from '@angular/core';
import {Iuser} from '../../Interfaces/iuser';
import {AuthService} from '../../Services/auth/auth.service';
import {Iauthservice} from '../../Interfaces/iauthservice';

@Component({
  selector: 'app-edit-profile',
  imports: [],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent {

  @Input() userInfo!: WritableSignal<Iuser>;

  private authService: Iauthservice = inject(AuthService)

  onInputChange(event: Event, propName: string): void {
    const inputElement = event.target as HTMLInputElement;
    this.userInfo().profile![propName] = inputElement.value;
  }

  saveProfile(): void {
    this.authService.updateInfoOnDb(this.userInfo());
  }
}
