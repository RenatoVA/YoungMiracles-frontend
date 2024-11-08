import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthRequest } from '../../../shared/models/auth-request.model';
import { StorageService } from '../../../core/services/storage.service';
import { inject, Injectable } from '@angular/core';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent{
  loginForm: FormGroup;
  error: string = '';
  isLoading: boolean = false;
  private storageService = inject(StorageService);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.error = '';
      const credentials: AuthRequest = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          if (response.token) {
            this.storageService.setAuthData(response);
            this.storageService.setusertype(response.tipousuario);
            this.router.navigate(['/home']);
          } else {
            this.error = 'Login failed. Please check your credentials.';
          }
        },
        error: (err) => {
          this.error = 'An error occurred. Please try again.';
          this.isLoading = false;
          console.error('Login error:', err);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}