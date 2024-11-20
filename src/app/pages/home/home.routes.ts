import { Routes } from "@angular/router";
import { ScheduleSessionComponent } from "./schedule-session/schedule-session.component";
import { HomeComponent } from "./home/home.component";
import { LayoutComponent } from "./layout/layout.component";

export const homeRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'schedule', component: ScheduleSessionComponent },
    ],
  },
];