import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {NavbarComponent} from '../../Components/nav/navbar/navbar.component';
import {ChartModule} from 'primeng/chart';
import {HttpService} from '../../Services/http/http.service';
import {Ihttp} from '../../Interfaces/ihttp';
import {IKpiData} from '../../Interfaces/iKpiData';
import {ToastrService} from 'ngx-toastr';
import {IkpiDashboard} from '../../Interfaces/ikpi-dashboard';
import {TableModule} from 'primeng/table';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-kpi-dashboard',
  imports: [NavbarComponent, ChartModule, TableModule, CommonModule],
  templateUrl: './kpi-dashboard.component.html',
  styleUrl: './kpi-dashboard.component.css'
})
export class KpiDashboardComponent implements OnInit, IkpiDashboard {

  protected readonly usersData: WritableSignal<any> = signal(null);
  protected readonly countryData: WritableSignal<any> = signal(null);
  protected readonly countryTableData: WritableSignal<any> = signal(null);
  private http: Ihttp = inject(HttpService);
  private toastr: ToastrService = inject(ToastrService);
  protected loadingCountryTable: WritableSignal<boolean> = signal(false);
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
    this.getData();
  }

  private getData(): void {
    this.http.get('api/admin/kpi').subscribe({
      next: (response: IKpiData) => {
        this.usersData.set(this.transformDataOnUsersBar(response));
        this.countryData.set(this.transformDataOnCountryPie(response));
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
          backgroundColor: this.generateRandomColors(),
          borderColor: this.generateRandomColors(),
          borderWidth: 1
        },
        {
          label: "Usuarios Registrados",
          data: usersRegisteredDataset,
          backgroundColor: this.generateRandomColors(),
          borderColor: this.generateRandomColors(),
          borderWidth: 1
        },
      ]
    };
  };

  private transformDataOnCountryPie(data: IKpiData) {
    // Combinar todos los country y eliminar duplicados

    const dataOfBar = {
      labels: [] as Array<string>,
      datasets: [] as Array<any>
    }

    const allCountry = [
      ...data.usersFromDiffCountry.map((entry: any) => entry.country),
    ];
    const labels = Array.from(new Set(allCountry)).sort(); // Ordenar las country
    dataOfBar.labels = labels;
    console.log(data.usersFromDiffCountry);

    // Crear dataset para "Usuarios de diferentes paises"
    const usersFromDiffCountryDataset = labels.map((country) => {
      const entry = data.usersFromDiffCountry.find((item: any) => item.country === country);
      return entry ? entry.totalUsers : 0;
    });

    const colores = [];

    // Generate different colors for each dataset
    for (const country in labels) {
      console.log(country);
      colores.push(this.generateRandomColors());
    }

    dataOfBar.datasets.push({
      data: usersFromDiffCountryDataset,
      backgroundColor: colores,
      borderColor: colores,
      borderWidth: 1
    });

    // Objeto transformado para Chart.js
    return dataOfBar;
  }

  private generateRandomColors(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgba(${r}, ${g}, ${b}, 0.5)`; // Color con transparencia
  }

  protected seeSpecificDataOnUsersBar(event: any): void {
    const datasetIndex = event.element.datasetIndex;
    const dataIndex = event.element.index;
    const dataset = this.usersData().datasets[datasetIndex];
    const label = this.usersData().labels[dataIndex];
    const value = dataset.data[dataIndex];

    console.log(`Label: ${label}`);
    console.log(`Value: ${value}`);
    // Puedes realizar otras acciones aquí, como actualizar datos o mostrar un modal.
  }

  protected seeSpecificDataOnCountryGraph(event: any): void {
    const dataIndex = event.element.index;
    const label = this.countryData().labels[dataIndex];

    console.log(`Label: ${label}`);
    // Puedes realizar otras acciones aquí, como actualizar datos o mostrar un modal.

    this.callSpecificDataOnCountryGraph(label);
  }

  private callSpecificDataOnCountryGraph(country: string): void {

    this.loadingCountryTable.set(true);

    this.http.get(`api/admin/kpi/${country}`).subscribe({
      next: (response: any) => {
        console.log(response);
        this.countryTableData.set(response);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Error al obtener los datos', 'Error');
      },
      complete: () => {
        this.loadingCountryTable.set(false);
      }
    })

  }
}
