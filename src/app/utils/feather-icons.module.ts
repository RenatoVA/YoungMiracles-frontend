import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { Home, ShoppingCart, BarChart2, Globe,Facebook, Twitter, Instagram, Linkedin} from 'angular-feather/icons';

const icons = {
  Home,
  ShoppingCart,
  BarChart2,
  Globe,
  Facebook, Twitter, Instagram, Linkedin
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class FeatherIconsModule {}