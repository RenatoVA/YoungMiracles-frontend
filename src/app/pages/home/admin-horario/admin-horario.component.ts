import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HorarioService } from '../../../core/services/horario.service';
import { HorarioRequest } from '../../../shared/models/horario-request.model';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../core/services/storage.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-horario',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin-horario.component.html',
  styleUrl: './admin-horario.component.css'
})
export class AdminHorarioComponent implements OnInit {
  horarios: any[] = []; // Lista de horarios existentes
  showCreateHorarioModal: boolean = false; // Estado para mostrar/ocultar el modal
  horarioForm: FormGroup; // Formulario reactivo para crear horarios
  showErrorModal: boolean = false;
  private storageService = inject(StorageService);
  private userinfo = this.storageService.getAuthData();
  
  constructor(private fb: FormBuilder, private horarioService: HorarioService) {
    this.horarioForm = this.fb.group({
      fecha: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_fin: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this.userinfo) {
      this.horarioService.gethorariosByVoluntario(this.userinfo.id).subscribe({
        next: (response) => {
          this.horarios = response;
        },
        error: (err) => {
          console.error('Error al obtener los horarios:', err);
        },
      });
    }
    
  }
  
  // Abrir el modal para crear horario
  openCreateHorarioModal() {
    this.showCreateHorarioModal = true;
  }
  
  // Cerrar el modal para crear horario
  closeCreateHorarioModal() {
    this.showCreateHorarioModal = false;
  }
  
  // Crear un nuevo horario
  onCreateHorario() {
    if (this.horarioForm.valid) {
      const newHorario: HorarioRequest = {
        ...this.horarioForm.value,
        voluntario_id: this.userinfo?.id/* ID del voluntario obtenido de la sesión o API */
      };
  
      this.horarioService.createHorario(newHorario).subscribe({
        next: (response) => {
          this.horarios.push(response); // Agregar el nuevo horario a la lista
          this.closeCreateHorarioModal();
        },
        error: (err) => {
          console.error('Error al crear el horario:', err);
        },
      });
    }
  }
  
  // Eliminar un horario
  deleteHorario(id: number) {
    this.horarioService.deleteHorario(id).subscribe({
      next: () => {
        this.horarios = this.horarios.filter((horario) => horario.id !== id); // Eliminar de la lista
      },
      error: (err) => {
        console.error('Error al eliminar el horario:', err);
        this.showErrorModal = true;
        if (err.status === 400 && err.error?.message === 'Horario con sesión pendiente') {
          this.showErrorModal = true; // Mostrar modal de error
        }
      },
    });
  }
  closeErrorModal() {
    this.showErrorModal = false;
  }
}
