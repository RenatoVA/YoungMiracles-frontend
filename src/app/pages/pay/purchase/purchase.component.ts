import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PurchaseRequest } from '../../../shared/models/purchase-request.model';
import { PurchaseService } from '../../../core/services/purchase.services';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit {
  sessionId: string | null = null;
  private PurchaseRequest: PurchaseRequest = {
    facturaId: 0,
    returnUrl: '',
    cancelUrl: ''
  };
  constructor(private route: ActivatedRoute,private purchaseService:PurchaseService,private storageService:StorageService) {}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('id');
    this.PurchaseRequest = {
      facturaId: this.sessionId ? +this.sessionId : 0,
      returnUrl: 'http://localhost:4200/pay/validate',
      cancelUrl: 'http://localhost:4200/pay/validate'
    };
  }
  gotoPay(): void {
    this.purchaseService.createFactura(this.PurchaseRequest).subscribe({
      next: (response) => {
        if (response.paypalUrl) {
          const url = new URL(response.paypalUrl);
          const token = url.searchParams.get('token');
          if (token) {
            this.storageService.setpayordertoken(token);
            window.location.href = response.paypalUrl;
          } else {
            console.error('No se encontró el token en el URL de PayPal');
          }
          window.location.href = response.paypalUrl;
        }
      },
      error: (err) => {
        console.error('Error creating factura:', err);
      }
    });
  }
}
