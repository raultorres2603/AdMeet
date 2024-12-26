import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {NavbarComponent} from '../../Components/nav/navbar/navbar.component';
import {ChartModule} from 'primeng/chart';
import {HttpService} from '../../Services/http/http.service';
import {Ihttp} from '../../Interfaces/ihttp';

@Component({
  selector: 'app-kpi-dashboard',
  imports: [NavbarComponent, ChartModule],
  templateUrl: './kpi-dashboard.component.html',
  styleUrl: './kpi-dashboard.component.css'
})
export class KpiDashboardComponent implements OnInit {

  protected readonly data: WritableSignal<any> = signal(null);
  private http: Ihttp = inject(HttpService);

  ngOnInit(): void {
    console.log(this.data());
    this.http.get('api/admin/kpi').subscribe({
      next: (_) => {
        console.log("OK")
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
