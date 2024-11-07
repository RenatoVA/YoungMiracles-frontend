import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-adulto-home',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './adulto-home.component.html',
  styleUrl: './adulto-home.component.css'
})
export class AdultoHomeComponent {
  currentYear = new Date().getFullYear();
  
  reservedSessions = [
    { cliente: 'Carlos García', fecha: '05/11/2024', hora: '10:00 AM', especialista: 'Dr. Fernández' },
    { cliente: 'Ana Pérez', fecha: '06/11/2024', hora: '2:00 PM', especialista: 'Lic. Gómez' }
  ];

  // datos simulados
  healthyRecipes = [
    { titulo: 'Ensalada de Quinoa', descripcion: 'Una ensalada rica en proteínas y fibra para mantenerte activo.' },
    { titulo: 'Batido de Frutas', descripcion: 'Un batido lleno de vitaminas y minerales para empezar tu día.' }
  ];

  constructor(private authService: AuthService) {}
  
  // Función para cerrar sesión
  logoutfunc = () => {
    // Asegúrate de que se está llamando al método logout del AuthService
    console.log('Cerrando sesión...');
    this.authService.logout();
  };


  //reservedSessions: any[] = []; 
  //healthyRecipes: any[] = [];   

  //constructor(private http: HttpClient) {} // httpClient

  //ngOnInit(): void {
    // Obtener sesiones reservadas 
    //this.http.get<any[]>('URL/endpoint-sesiones')
      //.subscribe(data => {
        //this.reservedSessions = data; // colocar datos obtenidos
      //}, error => {
        //console.error('Error al obtener sesiones reservadas:', error);
      //});

    // jalar las recomendaciones saludables 
    //this.http.get<any[]>('URL_DEL_BACKEND/endpoint-recetas')
      //.subscribe(data => {
        //this.healthyRecipes = data; // Asignar datos obtenidos 
      //}, error => {
       // console.error('Error al obtener recetas saludables:', error);
      //});
    //}
  }
  