import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-landing',
  imports: [FooterComponent,CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  standalone: true
})
export class LandingComponent {
  menuItems = [
    { label: 'NOSOTROS', link: '#' },
    { label: 'SERVICIOS', link: '#' },
    { label: 'CREAR UNA CUENTA', link: '#' },
    { label: 'CONTACTANOS', link: '#' }
  ];

  services = [
    { icon: 'home', label: 'Servicios a domicilio' },
    { icon: 'shopping_cart', label: 'Productos médicos' },
    { icon: 'bar_chart', label: 'Resultados garantizados' },
    { icon: 'public', label: 'Cobertura nacional' }
  ];
}