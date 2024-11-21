import { Component , OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SesionService } from '../../../core/services/sesion.service';
import { CommonModule } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { VoluntarioService } from '../../../core/services/voluntario.service';
import { VoluntariosResponse } from '../../../shared/models/voluntarios-response.model';
import { ChangeDetectorRef } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';
import { Router } from '@angular/router';
import { FacturaService } from '../../../core/services/factura.services';
import { FacturaRequest } from '../../../shared/models/factura-request.model';
import { HorarioResponse } from '../../../shared/models/horario-response.model';
import { HorarioService } from '../../../core/services/horario.service';

@Component({
  selector: 'app-horario-voluntario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './schedule-session.component.html',
  styleUrls: ['./schedule-session.component.css'],
})
export class ScheduleSessionComponent implements OnInit {
    selectedtypesesion: string | null = null;
    voluntarios: VoluntariosResponse[] = [];
    private storageService = inject(StorageService);
    private userinfo = this.storageService.getAuthData();
    horarios: HorarioResponse[] = []; 
    isLoading = false;
    isProcessing= false;
    selectedHorario: HorarioResponse | null = null; 
    tarifa: number = 0;
    tarifas: { [key in 'fisioterapia' | 'taller' | 'nutricion']: number } = {
      fisioterapia: 100.0,
      taller: 80.0,
      nutricion: 120.0,
    };

  constructor( private sesionService: SesionService,private router: Router,private facturaService: FacturaService,private horarioService: HorarioService) {
  }
  ngOnInit(): void {}
  selectType(selectedType: string): void {
    this.selectedtypesesion = selectedType;
    this.loadHorarios(selectedType); // Cargar horarios según la especialidad
  }
  private loadHorarios(especialidad: string): void {
    this.isLoading = true; // Activar indicador de carga
    this.horarioService.gethorariosByEspecialidad(especialidad.toLowerCase()).subscribe({
      next: (response) => {
        this.horarios = response.filter(horario => horario.disponibilidad === 'disponible');
        this.isLoading = false; // Desactivar indicador de carga
      },
      error: (error) => {
        console.error('Error al cargar horarios:', error);
        this.horarios = []; // Limpiar horarios en caso de error
        this.isLoading = false; // Desactivar indicador de carga
      },
    });
  }
  selectHorario(horario: HorarioResponse): void {
    this.selectedHorario = horario;
    const selectedType = this.selectedtypesesion?.toLowerCase() as 'fisioterapia' | 'taller' | 'nutricion';
    this.tarifa = this.tarifas[selectedType] || 0; // Calcular tarifa
  }
  goBack(): void {
    this.selectedHorario = null; // Limpiar la selección de horario
  }

  crearSesion(): void {
    if (!this.selectedHorario || !this.selectedtypesesion || !this.userinfo) {
      console.error('Faltan datos necesarios para crear la sesión');
      return;
    }
  
    this.isProcessing = true; // Mostrar círculo de carga
  
    const formData: any = {
      estado: 'pendiente',
      horarioId: this.selectedHorario.id,
      adultoMayorId: this.userinfo.id,
      voluntarioId: this.selectedHorario.voluntario_id,
      tiposesion: this.selectedtypesesion.toLowerCase(),
    };
  
    if (this.selectedtypesesion.toLowerCase() === 'fisioterapia') {
      formData.tipoFisioterapia = 'rehabilitacion';
      formData.observaciones = 'ninguna';
    } else if (this.selectedtypesesion.toLowerCase() === 'nutricion') {
      formData.indicaciones = 'ninguna';
      formData.receta = 'ninguna';
    } else if (this.selectedtypesesion.toLowerCase() === 'taller') {
      formData.descripcion = 'ninguna';
      formData.capacidadMaxima = 10;
      formData.materialRequerido = 'ninguno';
    }
  
    this.sesionService.createSession(formData).subscribe({
      next: (response) => {
        const facturaRequest: FacturaRequest = {
          usuarioId: response.adultomayorId,
          voluntarioId: response.voluntarioId,
          servicio: this.selectedtypesesion?.toUpperCase() ?? '',
        };
  
        this.facturaService.createFactura(facturaRequest).subscribe({
          next: (response) => {
            this.router.navigate(['/pay', response.facturaId]);
            this.isProcessing = false; // Ocultar círculo de carga
          },
          error: (error) => {
            console.error('Error al crear la factura:', error);
            this.isProcessing = false; // Ocultar círculo de carga
          },
        });
      },
      error: (error) => {
        console.error('Error al crear la sesión:', error);
        this.isProcessing = false; // Ocultar círculo de carga
      },
    });
  }




  proceedToPayment(): void {
    console.log('Continuando con el pago para:', this.selectedHorario,this.userinfo);
    this.crearSesion();
  }

}
