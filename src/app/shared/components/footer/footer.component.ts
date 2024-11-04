import { Component } from '@angular/core';
import { FeatherIconsModule } from '../../../utils/feather-icons.module';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FeatherIconsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}
