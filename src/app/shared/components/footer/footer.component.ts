import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Inicio', link: '#' },
    { label: 'Nosotros', link: '#' },
    { label: 'Servicios', link: '#' },
    { label: 'Contacto', link: '#' }
  ];

  services = [
    { label: 'Atención domiciliaria', link: '#' },
    { label: 'Productos médicos', link: '#' },
    { label: 'Consultas en línea', link: '#' },
    { label: 'Programas de bienestar', link: '#' }
  ];

  socialMedia = [
    { icon: 'facebook', link: '#', label: 'Facebook' },
    { icon: 'twitter', link: '#', label: 'Twitter' },
    { icon: 'instagram', link: '#', label: 'Instagram' },
    { icon: 'linkedin', link: '#', label: 'LinkedIn' }
  ];
}