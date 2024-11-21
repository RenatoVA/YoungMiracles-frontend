import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';
import { SesionService } from '../../../core/services/sesion.service';
import { SesionRequest } from '../../../shared/models/sesion-request.model';
import { SesionResponse } from '../../../shared/models/sesion-response.model';

@Component({
  selector: 'app-adulto-home',
  standalone: true,
  imports: [CommonModule,NavbarComponent,RouterLink],
  templateUrl: './adulto-home.component.html',
  styleUrl: './adulto-home.component.css'
})
export class AdultoHomeComponent implements OnInit {
  currentYear = new Date().getFullYear();
  private storageService = inject(StorageService);
  private userinfo = this.storageService.getAuthData();
  error: string = '';
  isLoading: boolean = false;
  reservedSessions: SesionResponse[] = [];
  healthyRecipes = [
    { titulo: 'Ensalada de Quinoa',imagen:"https://mojo.generalmills.com/api/public/content/RCngmFENdkS5zrHuS7yeVw_gmi_hi_res_jpeg.jpeg?v=93b2631f&t=16e3ce250f244648bef28c5949fb99ff", descripcion: 'Una ensalada rica en proteínas y fibra para mantenerte activo.' },
    { titulo: 'Batido de Frutas',imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCFqSaCXowpDCLf5w506mAfy-u_mijjIcKhQ&s", descripcion: 'Un batido lleno de vitaminas y minerales para empezar tu día.' }
  ];

  constructor(
    private authService: AuthService,
    private sesionService: SesionService,
    private router: Router) {}
  
  logoutfunc = () => {
    this.authService.logout();
  };

  ngOnInit() {
    this.isLoading = true;
    
    if (this.userinfo) {
      this.sesionService.getSesionesById(this.userinfo.id,"adultomayor").subscribe({
        next: (response) => {
          if (response) {
            console.log('userinfo:', this.userinfo);
            response.forEach(sesion => {
              if (sesion.estado === 'pendiente') {
                this.reservedSessions.push(sesion);
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
  updateSessionState(sessionId: number, newState: string): void {
    const payload = { id: sessionId, state: newState };
    this.sesionService.updatestateSession(payload).subscribe({
      next: () => {
        this.reservedSessions = this.reservedSessions.filter((session) => session.id !== sessionId);
      },
      error: (err) => {
        console.error(`Error al actualizar la sesión ${sessionId}:`, err);
      },
    });
  }
}
