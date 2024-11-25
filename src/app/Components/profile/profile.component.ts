import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {Iuser} from '../../Interfaces/iuser';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  @Input() userInfo!: Iuser;

}
