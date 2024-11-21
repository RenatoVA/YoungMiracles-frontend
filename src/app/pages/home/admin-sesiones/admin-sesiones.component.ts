import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { SesionResponse } from '../../../shared/models/sesion-response.model';
import { SesionService } from '../../../core/services/sesion.service';
import { StorageService } from '../../../core/services/storage.service';
@Component({
  selector: 'app-admin-sesiones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-sesiones.component.html',
  styleUrl: './admin-sesiones.component.css'
})
export class AdminSesionesComponent implements OnInit {
  private storageService = inject(StorageService);
  error: string = '';
  private userinfo = this.storageService.getAuthData();
  typeUser = this.userinfo ? this.userinfo.tipousuario : "";
  sessions: any[] = [];
  selectedSession: any = null;
  constructor(private sesionService: SesionService) {}
  ngOnInit(): void {
    this.loadSessions();
  }
  loadSessions() {
    if (this.userinfo) {
      this.sesionService.getSesionesById(this.userinfo.id,this.typeUser).subscribe({
        next: (response) => {
          if (response) {
            this.sessions = response;
          } else {  
            this.error = 'No se pudo obtener las sesiones.';
          }
        },
        error: (err) => {
          console.error('Sesion error:', err);

        },
        complete: () => {
        }
      });
  }
}
openModal(session: any): void {
  console.log('session:', session);
  this.selectedSession = session;
}

// Cerrar modal
closeModal(): void {
  this.selectedSession = null;
}

}
