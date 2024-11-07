import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-voluntario-home',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './voluntario-home.component.html',
  styleUrl: './voluntario-home.component.css'
})
export class VoluntarioHomeComponent {
  currentYear = new Date().getFullYear();

  constructor(private authService: AuthService) {}

  menuItems = [
    { label: 'PERFIL', link: '#' },
    { label: 'MIS SESIONES', link: '#' },
    { label: 'SOLICITUDES', link: '#' }
  ];
  //Simule sesiones y reservas para ver como se veía
  reservedSessions = [
    { cliente: 'Carlos García', fecha: '05/11/2024', hora: '10:00 AM' },
    { cliente: 'Ana Pérez', fecha: '06/11/2024', hora: '2:00 PM' }
  ];

  reservationRequests = [
    { cliente: 'Jorge Ramos', fecha: '07/11/2024', hora: '9:00 AM' },
    { cliente: 'Lucía Fernández', fecha: '08/11/2024', hora: '4:00 PM' }
  ];

  // la funcion para aceptar una solicitud
  acceptRequest(request: any) {
    console.log(`Solicitud aceptada para ${request.cliente}`);
    // Lógica para aceptar la solicitud
  }

  // la funcion para rechazar una solicitud
  rejectRequest(request: any) {
    console.log(`Solicitud rechazada para ${request.cliente}`);
  }
  logoutfunc = () => {
    this.authService.logout();
  }
}
