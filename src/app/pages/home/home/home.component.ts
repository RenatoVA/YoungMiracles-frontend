import { Component } from '@angular/core';
import { AdultoHomeComponent } from '../adulto-home/adulto-home.component';
import { VoluntarioHomeComponent } from '../voluntario-home/voluntario-home.component';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-home',
  template: `
    <ng-container *ngIf="typeuser === 'voluntario'; else adultoMayorTemplate">
      <app-voluntario-home></app-voluntario-home>
    </ng-container>
    <ng-template #adultoMayorTemplate>
      <app-adulto-home></app-adulto-home>
    </ng-template>
  `,
  standalone: true,
  imports: [AdultoHomeComponent,VoluntarioHomeComponent,CommonModule],

})
export class HomeComponent {
  typeuser: string | null = localStorage.getItem('usertype');

  constructor() {}
}