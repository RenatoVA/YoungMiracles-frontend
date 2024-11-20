import { inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { VoluntariosResponse } from '../../shared/models/voluntarios-response.model';
@Injectable({
    providedIn: 'root'
})
export class VoluntarioService  {

    private apiUrl = `${environment.apiUrl}/usuarios/voluntarios`;
    private http = inject(HttpClient);

    constructor() { }

    getAllVoluntarios(): Observable<VoluntariosResponse[]> {
        return this.http.get<VoluntariosResponse[]>(`${this.apiUrl}`);
      }

}