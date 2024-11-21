import { inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { FacturaResponse } from '../../shared/models/factura-response.model';
import { FacturaRequest } from '../../shared/models/factura-request.model';
@Injectable({
    providedIn: 'root'
})
export class FacturaService  {

    private apiUrl = `${environment.apiUrl}/facturas`;
    private http = inject(HttpClient);

    constructor() { }

    createFactura(facturaRequest: FacturaRequest): Observable<FacturaResponse> {
        return this.http.post<FacturaResponse>(`${this.apiUrl}`, facturaRequest);
    }
    getFacturasById(id: number): Observable<FacturaResponse[]> {
        return this.http.get<FacturaResponse[]>(`${this.apiUrl}/usuario/${id}`);
    }
}