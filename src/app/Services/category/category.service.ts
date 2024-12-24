import {Injectable, signal, WritableSignal} from '@angular/core';
import {Icategoryservice} from '../../Interfaces/icategoryservice';


@Injectable({
  providedIn: 'root'
})
export class CategoryService implements Icategoryservice {

  private categories: WritableSignal<Array<any>> = signal([]);

  getCategories(): Array<any> {
    return this.categories();
  }

  setCategories(categories: Array<any>): void {
    this.categories.set(categories);
  }

  constructor() {
  }
}
