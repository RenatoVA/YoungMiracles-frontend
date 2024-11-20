import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HorarioResponse } from '../../shared/models/horario-response.model';
import { HorarioRequest } from '../../shared/models/horario-request.model';
import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private baseURL = `${environment.apiUrl}/horarios`;

  private http = inject(HttpClient);
  
  constructor() { }

  createHorario(horarioData: HorarioRequest): Observable<HorarioResponse> {
    return this.http.post<HorarioResponse>(`${this.baseURL}`, horarioData);
  }

  gethorariosByEspecialidad(especialidad: string): Observable<HorarioResponse[]> {
    return this.http.get<HorarioResponse[]>(`${this.baseURL}/especialidad/${especialidad}`);
  }

}