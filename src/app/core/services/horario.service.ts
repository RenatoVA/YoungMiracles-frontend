import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private baseURL = `${environment.apiUrl}/horarios`;

  constructor(private http: HttpClient) {}

  // Método para crear un horario
  createHorario(horarioData: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/create`, horarioData);
  }

}