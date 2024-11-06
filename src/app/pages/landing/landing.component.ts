import { Component, OnInit, OnDestroy } from '@angular/core';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import {CommonModule} from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-landing',
  imports: [FooterComponent,CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  standalone: true,

})
export class LandingComponent implements OnInit, OnDestroy {
  menuItems = [
    { label: 'NOSOTROS', link: '#' },
    { label: 'SERVICIOS', link: '#' },
    { label: 'CONTACTANOS', link: '#' }
  ];

  services = [
    { icon: 'home', label: 'Servicios a domicilio' },
    { icon: 'shopping_cart', label: 'Productos médicos' },
    { icon: 'bar_chart', label: 'Resultados garantizados' },
    { icon: 'public', label: 'Cobertura nacional' }
  ];
  slides = [
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_1r0idMhAZfZazbxI5BVh_xdm7mdyxJLTBQ&s',
      alt: 'Healthcare professional interacting with patient'
    },
    {
      image: 'https://dulcehogar.pe/wp-content/uploads/2021/03/casa-de-reposo-lima-peru-adultos-mayores-blog-1.jpg',
      alt: 'Caregiver assisting person in wheelchair'
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn4RRsj907QT0b0IWUeOri6wCw2VeMsVXsmQ&s',
      alt: 'Therapeutic hand massage'
    }
  ];

  currentSlide = 0;
  private autoSlideInterval: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  private startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  private stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  onSlideHover(isHovering: boolean) {
    if (isHovering) {
      this.stopAutoSlide();
    } else {
      this.startAutoSlide();
    }
  }
}