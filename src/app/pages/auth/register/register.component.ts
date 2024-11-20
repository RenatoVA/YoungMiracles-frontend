import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterAdultRequest } from '../../../shared/models/register-adult-request.model';
import { RegisterVoluntarioRequest } from '../../../shared/models/register-voluntario-request.model';
import { ChangeDetectorRef } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';
import { inject, Injectable } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export default class RegisterComponent {
  registerForm: FormGroup;
  error: string = '';
  isLoading: boolean = false;
  userTypes = ['voluntario', 'adultomayor'];
  selectedUserType: string | null = null;
  private storageService = inject(StorageService);
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(18)]],
      genero: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      correo: ['', [Validators.required, Validators.email]],
      especialidad: [''],
      horasDisponibles: [null],
      experiencia: [null],
      nivelActividad: [''],
      necesitaAsistenciaFamiliar: [false]
    });
  }

  selectUserType(type: string) {
    this.selectedUserType = type;
    if (type === 'voluntario') {
      this.registerForm.get('especialidad')?.setValidators(Validators.required);
      this.registerForm.get('horasDisponibles')?.setValidators([Validators.required, Validators.min(1)]);
      this.registerForm.get('experiencia')?.setValidators([Validators.required, Validators.min(0)]);
    } else if (type === 'adultomayor') {
      this.registerForm.get('nivelActividad')?.setValidators(Validators.required);
      this.registerForm.get('necesitaAsistenciaFamiliar')?.setValidators(Validators.required);
    }
    this.registerForm.updateValueAndValidity();
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.registerForm.valid && this.selectedUserType) {
      this.isLoading = true;
      this.error = '';
      if (this.selectedUserType === 'adultomayor') {
        
        const userData: RegisterAdultRequest = { ...this.registerForm.value, tipousuario: this.selectedUserType };
        this.authService.registerAdulto(userData).subscribe({
          next: (response) => {
            console.log("hola",response);
            if (response.token) {
              this.storageService.setAuthData(response);
              this.storageService.setusertype(response.tipousuario);
              this.router.navigate(['/home']);
            } else {  
              this.error = 'Registration failed. Please try again.';
            }
          },
          error: (err) => {
            this.error = 'An error occurred. Please try again.';
            console.error('Registration error:', err);
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      } else{
        const userData:RegisterVoluntarioRequest = { ...this.registerForm.value, tipousuario: this.selectedUserType };
        console.log('Login credentials:', userData)
        this.authService.registerVoluntario(userData).subscribe({
          next: (response) => {
            if (response.token) {
              this.storageService.setAuthData(response);
              this.storageService.setusertype(response.tipousuario);
              this.router.navigate(['/home']);
            } else {
              this.error = 'Registration failed. Please try again.';
            }
          },
          error: (err) => {
            this.error = 'An error occurred. Please try again.';
            console.error('Registration error:', err);
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      }

    }
  }
}