import { inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { SesionResponse } from '../../shared/models/sesion-response.model';
import { SesionRequest } from '../../shared/models/sesion-request.model';
@Injectable({
    providedIn: 'root'
})
export class SesionService  {

    private apiUrl = `${environment.apiUrl}/sesiones`;
    private http = inject(HttpClient);

    constructor() { }

    createSession(sesionRequest: SesionRequest): Observable<SesionResponse> {
        return this.http.post<SesionResponse>(`${this.apiUrl}`, sesionRequest);
    }

    getSesionesById(id: number,type:string): Observable<SesionResponse[]> {
        return this.http.get<SesionResponse[]>(`${this.apiUrl}/${type}/${id}`);
      }

    deleteSession(sessionId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${sessionId}`);
    }
    updatestateSession(sessiondata:any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/state`,sessiondata);
    }
}