import { inject,Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from '../../shared/models/auth-request.model';
import { AuthResponse } from '../../shared/models/auth-response.model';
import { RegisterAdultRequest } from '../../shared/models/register-adult-request.model';
import { RegisterAdultResponse } from '../../shared/models/register-adulto-response.model';
import { RegisterVoluntarioRequest } from '../../shared/models/register-voluntario-request.model';
import { RegisterVoluntarioResponse } from '../../shared/models/register-voluntario-response.model';
import { StorageService } from './storage.service';
import { UpdateUsuario } from '../../shared/models/update-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = `${environment.apiUrl}/auth`;
  private updateURL = `${environment.apiUrl}/usuarios`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private router = inject(Router);

  constructor() { }

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseURL}/login`, authRequest)
    .pipe(
      tap(response => this.storageService.setAuthData(response))
    );
  }
  registerAdulto(registerAdultRequest: RegisterAdultRequest): Observable<RegisterAdultResponse> {
    return this.http.post<RegisterAdultResponse>(`${this.baseURL}/register/usuario`,
      registerAdultRequest);
  }
  registerVoluntario(registerVoluntarioRequest: RegisterVoluntarioRequest): Observable<RegisterVoluntarioResponse> {
    return this.http.post<RegisterVoluntarioResponse>(`${this.baseURL}/register/usuario`,
      registerVoluntarioRequest);
  }

  logout(): void {
    this.storageService.clearAuthData();
    this.router.navigate(['/']);
  }
  isAuthenticated(): boolean {
    return this.storageService.getAuthData() !== null;
  }
  getUser(): AuthResponse | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData : null;
  }

  getUserRole(): string | null {
    const authData = this.storageService.getAuthData();
    return authData ? authData.role : null;
  }
  updateUser(user: UpdateUsuario, id:number): Observable<any> {
    return this.http.put<UpdateUsuario>(`${this.updateURL}/${id}`,user);
  }
}
