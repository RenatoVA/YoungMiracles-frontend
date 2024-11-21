import { Routes } from "@angular/router";
import { ScheduleSessionComponent } from "./schedule-session/schedule-session.component";
import { HomeComponent } from "./home/home.component";
import { LayoutComponent } from "./layout/layout.component";
import {AdminSesionesComponent} from './admin-sesiones/admin-sesiones.component';
import { AdminHorarioComponent } from "./admin-horario/admin-horario.component";
import { AdminFacturasComponent } from "./admin-facturas/admin-facturas.component";
import { AdminPerfilComponent } from "./admin-perfil/admin-perfil.component";

export const homeRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'schedule', component: ScheduleSessionComponent },
      { path: 'sesiones', component:AdminSesionesComponent},
      {path: 'facturas',component:AdminFacturasComponent},
      {path: 'horarios',component:AdminHorarioComponent},
      {path: 'perfil',component:AdminPerfilComponent}
    ],
  },
];