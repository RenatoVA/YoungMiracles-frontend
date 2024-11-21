import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { SesionService } from '../../../core/services/sesion.service';
import { StorageService } from '../../../core/services/storage.service';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CommonModule } from '@angular/common';

Chart.register(...registerables, ChartDataLabels);
@Component({
  selector: 'app-voluntario-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voluntario-home.component.html',
  styleUrls: ['./voluntario-home.component.css']
})
export class VoluntarioHomeComponent implements OnInit {
  reservedSessions: any[] = [];
  reporte: any = null;
  private userinfo = inject(StorageService).getAuthData();

  constructor(private sesionService: SesionService) {}

  ngOnInit(): void {
    this.loadSessions();
    this.loadReport();
  }

  loadSessions(): void {
    if (this.userinfo) {
      this.sesionService.getSesionesById(this.userinfo.id, 'voluntario').subscribe({
        next: (response) => {
          this.reservedSessions = response.filter((sesion: any) => sesion.estado === 'pendiente');
        },
        error: (err) => console.error('Error al cargar sesiones:', err),
      });
    }
  }

  loadReport(): void {
    if (this.userinfo) {
      this.sesionService.reporteSesiones(this.userinfo.id).subscribe({
        next: (response) => {
          this.reporte = response;
          this.createMetricsChart();
        },
        error: (err) => console.error('Error al cargar el reporte:', err),
      });
    }
  }

  createMetricsChart(): void {
    const ctx = document.getElementById('metricsChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Completadas', 'Pendientes', 'Canceladas'],
          datasets: [
            {
              data: [
                this.reporte?.completadas || 0,
                this.reporte?.pendientes || 0,
                this.reporte?.canceladas || 0
              ],
              backgroundColor: ['#38b2ac', '#ffae42', '#e53e3e'], // Colores: verde, naranja, rojo
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
            datalabels: {
              color: '#fff',
              formatter: (value: number, context) => {
                // Verificar que context.dataset.data tiene datos numéricos
                const data = context.dataset.data as number[];
                const total = data.reduce((acc, curr) => acc + curr, 0); // Calcular el total
  
                // Si el valor es 0 o total es 0, no mostrar nada
                if (value === 0 || total === 0) {
                  return '';
                }
  
                // Calcular y devolver el porcentaje
                const percentage = ((value / total) * 100).toFixed(1);
                return `${percentage}%`;
              },
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
        },
      });
    }
  }
  updateSessionState(sessionId: number, newState: string): void {
    const payload = { id: sessionId, state: newState };
    this.sesionService.updatestateSession(payload).subscribe({
      next: () => {
        this.reservedSessions = this.reservedSessions.filter((session) => session.id !== sessionId);
        this.loadReport();
      },
      error: (err) => {
        console.error(`Error al actualizar la sesión ${sessionId}:`, err);
      },
    });
  }
}
