import {Component, Input} from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category',
  imports: [FontAwesomeModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  @Input() Id!: string;
  @Input() Name!: string;
  @Input() Icon!: string;

  fas = fas

}
