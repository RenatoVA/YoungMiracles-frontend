import { Component, inject, OnInit } from '@angular/core';
import { FacturaService } from '../../../core/services/factura.services';
import { FacturaResponse } from '../../../shared/models/factura-response.model';
import { Chart, registerables } from 'chart.js';
import { StorageService } from '../../../core/services/storage.service';
import { CommonModule } from '@angular/common';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);
@Component({
  selector: 'app-admin-facturas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-facturas.component.html',
  styleUrl: './admin-facturas.component.css'
})
export class AdminFacturasComponent implements OnInit {

  facturas: FacturaResponse[] = [];
  metrics: any = {};
  private storageService = inject(StorageService);
  private userinfo = this.storageService.getAuthData();
  selectedFactura: FacturaResponse | null = null;

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    if (this.userinfo) {
      
    
    this.facturaService.getFacturasById(this.userinfo.id).subscribe({
      next: (response) => {
        this.facturas = response;
        this.calculateMetrics();
        this.createMetricsChart();
      },
      error: (err) => console.error('Error al cargar las facturas:', err),
    });
  }
  }

  calculateMetrics(): void {
    const pagadas = this.facturas.filter((f) => f.estado === 'PAID');
    const pendientes = this.facturas.filter((f) => f.estado === 'PENDING');
    const canceladas = this.facturas.filter((f) => f.estado === 'CANCELED');

    this.metrics = {
      totalFacturas: this.facturas.length,
      gastoTotal: pagadas.reduce((acc, f) => acc + f.total, 0),
      ultimaFactura: this.facturas.sort((a, b) => (a.fecha > b.fecha ? -1 : 1))[0] || null,
      pagadas: pagadas.length,
      pendientes: pendientes.length,
      canceladas: canceladas.length,
    };
  }

  createMetricsChart(): void {
    const ctx = document.getElementById('facturasChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Pagadas', 'Pendientes', 'Canceladas'],
          datasets: [
            {
              data: [
                this.metrics.pagadas || 0,
                this.metrics.pendientes || 0,
                this.metrics.canceladas || 0,
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
                const data = context.dataset.data as number[];
                const total = data.reduce((acc, curr) => acc + curr, 0);
  
                // Si el valor o total es 0, no mostrar nada
                if (value === 0 || total === 0) {
                  return '';
                }
  
                // Calcular porcentaje
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

  openModal(factura: FacturaResponse): void {
    this.selectedFactura = factura;
  }

  closeModal(): void {
    this.selectedFactura = null;
  }
}
