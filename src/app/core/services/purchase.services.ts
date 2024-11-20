import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { PurchaseResponse } from '../../shared/models/purchase-response.model';
import { PurchaseRequest } from '../../shared/models/purchase-request.model';
import { purchaseValidateRequest } from '../../shared/models/purchase-validate-request.model';
import { purchaseValidateResponse } from '../../shared/models/purchase-validate-response.model';
@Injectable({
    providedIn: 'root'
})
export class PurchaseService {

    private apiUrl = `${environment.apiUrl}/checkout`;
    private http = inject(HttpClient);

    constructor() { }

    createFactura(params: PurchaseRequest): Observable<PurchaseResponse> {
        let httpParams = new HttpParams();
        (Object.keys(params) as (keyof PurchaseRequest)[]).forEach(key => {
            if (params[key] !== undefined && params[key] !== null) {
                httpParams = httpParams.append(key, params[key]);
            }
        });
        return this.http.post<PurchaseResponse>(`${this.apiUrl}/create`, null, { params: httpParams });
    }
    captureOrder(params: purchaseValidateRequest): Observable<purchaseValidateResponse> {
        let httpParams = new HttpParams();
        (Object.keys(params) as (keyof purchaseValidateRequest)[]).forEach(key => {
            if (params[key] !== undefined && params[key] !== null) {
                httpParams = httpParams.append(key, params[key]);
            }
        });
        return this.http.post<purchaseValidateResponse>(`${this.apiUrl}/capture`, null, { params: httpParams });
    }
}