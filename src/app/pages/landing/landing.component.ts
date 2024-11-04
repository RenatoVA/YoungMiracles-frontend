import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { AboutComponent } from '../../shared/components/about/about.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent,HeroComponent,AboutComponent,FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
