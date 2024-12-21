import {Component, signal, WritableSignal} from '@angular/core';

@Component({
  selector: 'app-radio-to-search',
  imports: [],
  templateUrl: './radio-to-search.component.html',
  styleUrl: './radio-to-search.component.css'
})
export class RadioToSearchComponent {

  public radio: WritableSignal<number> = signal(0)

  changeRadio(event: any) {
    this.radio.set(event.target.value)
  }

}
