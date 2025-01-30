import {Component, inject, OnInit} from '@angular/core';
import {NavbarComponent} from '../../nav/navbar/navbar.component';
import {Iauthservice} from '../../../Interfaces/iauthservice';
import {AuthService} from '../../../Services/auth/auth.service';
import {UserService} from '../../../Services/user/user.service';
import {Iuserservice} from '../../../Interfaces/iuserservice';
import {HttpService} from '../../../Services/http/http.service';
import {Ihttp} from '../../../Interfaces/ihttp';
import {Iuser} from '../../../Interfaces/iuser';
import {CommonModule} from '@angular/common';
import {CategoryService} from '../../../Services/category/category.service';
import {CategoryComponent} from '../category/category.component';
import {SearcherComponent} from '../searcher/searcher.component';
import {RadioToSearchComponent} from '../radio-to-search/radio-to-search.component';

interface Iresponse {
  user: Iuser,
  newTok: string
}

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, CommonModule, CategoryComponent, SearcherComponent, RadioToSearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  private authService: Iauthservice = inject(AuthService);
  private userService: Iuserservice = inject(UserService);
  protected categoryService: any = inject(CategoryService);
  private http: Ihttp = inject(HttpService);

  ngOnInit(): void {
    this.http.get(`api/user/${this.authService.getToken()}/get`).subscribe({
      next: (response: Iresponse) => {
        this.userService.updateInfo(response.user);
        this.authService.updateToken(response.newTok);
      },
      error: (err) => {
        console.log(err);
        this.authService.logOut();
      }
    })
    // Pick categories from API
    this.http.get('api/category/all').subscribe({
      next: (response: Array<any>) => {
        this.categoryService.setCategories(response);
      },
      error: (err) => {
        console.log(err);
        this.authService.logOut();
      }
    })
  }

}
