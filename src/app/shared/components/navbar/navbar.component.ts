import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() logoutfunc!: () => void;
  @Input() typeUser!: string | undefined; // Tipo de usuario

}
