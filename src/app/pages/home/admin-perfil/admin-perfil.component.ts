import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateUsuario } from '../../../shared/models/update-usuario.model';

@Component({
  selector: 'app-admin-perfil',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './admin-perfil.component.html',
  styleUrl: './admin-perfil.component.css'
})
export class AdminPerfilComponent {
  profileForm!: FormGroup;
  isUpdating = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const userData = this.storageService.getAuthData();

    // Inicializar el formulario con los datos del usuario
    this.profileForm = this.fb.group({
      nombre: [userData?.nombre || '', Validators.required],
      apellido_paterno: [userData?.apellido_paterno || '', Validators.required],
      apellido_materno: [userData?.apellido_materno || '', Validators.required],
      correo: [userData?.correo || '', [Validators.required, Validators.email]],
      genero: [userData?.genero || ''],
      edad: [userData?.edad || '', [Validators.required, Validators.min(1)]],
    });
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      this.isUpdating = true;
  
      const updatedData: UpdateUsuario = this.profileForm.value;
  
      const userData = this.storageService.getAuthData();
      if (!userData) {
        console.error('No se encontraron datos de usuario en el storage.');
        this.isUpdating = false;
        return;
      }
      this.authService.updateUser(updatedData,userData.id).subscribe({
        next: (response) => {
          // Actualizar el local storage
          
          if (userData) {
            // Actualizar los campos en el JSON de userData
            const updatedUserData = {
              ...userData,
              nombre: updatedData.nombre,
              apellido_paterno: updatedData.apellido_paterno,
              apellido_materno: updatedData.apellido_materno,
              edad: updatedData.edad,
              genero: updatedData.genero,
              correo: updatedData.correo,
            };
  
            // Borrar y volver a setear la información en el storage
            this.storageService.clearAuthData();
            this.storageService.setAuthData(updatedUserData);
          }
  
          this.isUpdating = false;
          alert('Perfil actualizado con éxito.');
        },
        error: (err) => {
          console.error('Error al actualizar el perfil:', err);
          this.isUpdating = false;
          alert('Hubo un error al actualizar el perfil.');
        },
      });
    }
  }

}
