import { Component } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  correo:string=""
  contrasena:string=""

  constructor(private authService:AuthService, private router:Router){

  }
  login(): void {
    this.authService.login(this.correo, this.contrasena).subscribe({
      next: (response)=> {
        const token = response.token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;
        /*
        if(role === 'admin') {
          this.router.navigate(['/dashboard'])
        }else {
          this.router.navigate(['/profile'])
        }
        */
      },
      error: (err) => console.error('Login failed', err)
    })
  }

}
