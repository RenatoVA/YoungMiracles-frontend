import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HorarioService } from '../../../core/services/horario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horario-voluntario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './schedule-session.component.html',
  styleUrls: ['./schedule-session.component.css'],
})
export class ScheduleSessionComponent {
    horarioForm: FormGroup;

  constructor(private fb: FormBuilder, private horarioService: HorarioService) {
    this.horarioForm = this.fb.group({
      fecha: [''],
      horaInicio: [''],
      horaFin: [''],
      descripcion: ['']
    });
  }

  onSubmit() {
    if (this.horarioForm.valid) {
      this.horarioService.createHorario(this.horarioForm.value).subscribe({
        next: (response) => {
          console.log('Horario creado:', response);
          // la respuesta exitosa
        },
        error: (err) => {
          console.error('Error al crear el horario:', err);
          // para el manejo de error
        }
      });
    }
  }
}
