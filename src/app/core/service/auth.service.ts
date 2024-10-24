import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL = 'http://localhost:8080/api/v1/auth/login';
  private tokenKey = 'authToken';

  constructor(private httpClient:HttpClient, private router: Router) { }

  login(correo: string, contrasena: string): Observable<any>{
    return this.httpClient.post<any>(this.LOGIN_URL, {correo, contrasena}).pipe(
      tap(response => {
        if(response.token){
          console.log(response.token);
          this.setToken(response.token);
        }   
      })
    )
  }

  private setToken(token: string): void{
    localStorage.setItem(this.tokenKey, token)
  }

  private getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }
  logout(): void{
    localStorage.removeItem(this.tokenKey); // renueve el token del storage
    this.router.navigate(['/login']);
  }
}
