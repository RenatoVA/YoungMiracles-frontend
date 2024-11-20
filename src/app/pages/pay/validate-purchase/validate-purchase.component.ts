import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PurchaseService } from '../../../core/services/purchase.services';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-validate-purchase',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './validate-purchase.component.html',
    styleUrl: './validate-purchase.component.css'
})
export class ValidatePurchaseComponent implements OnInit {
    isValidating = true;
    paymentSuccessful = false;
    constructor(private router: Router, private route:ActivatedRoute, private purchaseService: PurchaseService) { }

    ngOnInit(): void {
        const token = this.route.snapshot.queryParamMap.get('token');
        if (token) {
            this.purchaseService.captureOrder({ orderId: token }).subscribe({
                next: (response) => {
                    if (response.completed) {
                        this.paymentSuccessful = true;
                        this.isValidating = false;
                    }
                    this.isValidating = false;
                },
                error: (err) => {
                    console.error('Error capturing order:', err);
                    this.paymentSuccessful = false;
                    this.isValidating = false;
                }
            });
        }
        else {
            console.error('No se encontró el token en la URL');
            this.paymentSuccessful = false;
            this.isValidating = false; 
        }
    }
    continue(): void {
        this.router.navigate(['/home']);
    }
    retry(): void {
        this.router.navigate(['/home/schedule']);
    }

}
