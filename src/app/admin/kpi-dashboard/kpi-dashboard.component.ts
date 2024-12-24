import {Component} from '@angular/core';
import {NavbarComponent} from '../../Components/nav/navbar/navbar.component';
import {ChartModule} from 'primeng/chart';

@Component({
  selector: 'app-kpi-dashboard',
  imports: [NavbarComponent, ChartModule],
  templateUrl: './kpi-dashboard.component.html',
  styleUrl: './kpi-dashboard.component.css'
})
export class KpiDashboardComponent {

}
