import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { PurchaseComponent } from "./purchase/purchase.component";
import { ValidatePurchaseComponent } from "./validate-purchase/validate-purchase.component";

export const payRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'validate', component: ValidatePurchaseComponent },
      { path: ':id', component: PurchaseComponent }
    ],
  },
];