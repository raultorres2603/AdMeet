import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {NavbarComponent} from '../../Components/nav/navbar/navbar.component';
import {ChartModule} from 'primeng/chart';
import {HttpService} from '../../Services/http/http.service';
import {Ihttp} from '../../Interfaces/ihttp';
import {IKpiData} from '../../Interfaces/iKpiData';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-kpi-dashboard',
  imports: [NavbarComponent, ChartModule],
  templateUrl: './kpi-dashboard.component.html',
  styleUrl: './kpi-dashboard.component.css'
})
export class KpiDashboardComponent implements OnInit {

  protected readonly usersData: WritableSignal<any> = signal(null);
  private http: Ihttp = inject(HttpService);
  private toastr: ToastrService = inject(ToastrService);
  protected readonly options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  ngOnInit(): void {
    this.http.get('api/admin/kpi').subscribe({
      next: (response: IKpiData) => {
        this.usersData.set(this.transformDataOnUsersBar(response));
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error al obtener los datos', 'Error');
      }
    })
  }

  private transformDataOnUsersBar(data: IKpiData) {
    // Combinar todas las fechas y eliminar duplicados
    const allDates = [
      ...data.usersLogedIn.map((entry: any) => entry.date),
      ...data.usersRegistered.map((entry: any) => entry.date)
    ];
    const labels = Array.from(new Set(allDates)).sort(); // Ordenar las fechas

    // Crear dataset para "Usuarios Logeados"
    const usersLogedInDataset = labels.map((date) => {
      const entry = data.usersLogedIn.find((item: any) => item.date === date);
      return entry ? entry.totalUsersLogedIn : 0;
    });

    // Crear dataset para "Usuarios Registrados"
    const usersRegisteredDataset = labels.map((date) => {
      const entry = data.usersRegistered.find((item: any) => item.date === date);
      return entry ? entry.totalUsersRegistered : 0;
    });

    // Objeto transformado para Chart.js
    return {
      labels,
      datasets: [
        {
          label: "Usuarios Logeados",
          data: usersLogedInDataset,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1
        },
        {
          label: "Usuarios Registrados",
          data: usersRegisteredDataset,
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1
        },
      ]
    };
  };

  protected seeSpecificData(event: any): void {
    const datasetIndex = event.element.datasetIndex;
    const dataIndex = event.element.index;
    const dataset = this.usersData().datasets[datasetIndex];
    const label = this.usersData().labels[dataIndex];
    const value = dataset.data[dataIndex];

    console.log(`Dataset: ${dataset.label}`);
    console.log(`Label: ${label}`);
    console.log(`Value: ${value}`);
    // Puedes realizar otras acciones aquí, como actualizar datos o mostrar un modal.
  }
}
