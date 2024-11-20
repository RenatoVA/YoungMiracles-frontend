import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { inject, Injectable } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { AuthService } from '../../../core/services/auth.service';
import { SesionService } from '../../../core/services/sesion.service';
import { SesionResponse } from '../../../shared/models/sesion-response.model';
import { SesionRequest } from '../../../shared/models/sesion-request.model';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-voluntario-home',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './voluntario-home.component.html',
  styleUrl: './voluntario-home.component.css'
})
export class VoluntarioHomeComponent implements OnInit{
  currentYear = new Date().getFullYear();
  private storageService = inject(StorageService);
  private userinfo = this.storageService.getAuthData();
  error: string = '';
  isLoading: boolean = false;
  reservedSessions: SesionResponse[] = [];
  pastSessions: SesionResponse[] = [];

  constructor(private authService: AuthService,private sesionService:SesionService) {}
  logoutfunc = () => {
    this.authService.logout();
  }

  ngOnInit() {
    this.isLoading = true;
    
    if (this.userinfo) {
      this.sesionService.getSesionesById(this.userinfo.id,"voluntario").subscribe({
        next: (response) => {
          if (response) {
            console.log('userinfo:', response);
            response.forEach(sesion => {
              if (sesion.estado === 'pendiente') {
                this.reservedSessions.push(sesion);
              } else {
                this.pastSessions.push(sesion);
              }
            });
          } else {  
            this.error = 'No se pudo obtener las sesiones.';
          }
        },
        error: (err) => {
          console.error('Sesion error:', err);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
    

  }
}
