import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
