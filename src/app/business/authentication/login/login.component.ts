import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { CommonModule } from '@angular/common';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.error = '';
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response.token) {
            localStorage.setItem('jwtToken', response.token);
            this.router.navigate(['/dashboard']);
          } else {
            this.error = 'Login failed. Please check your credentials.';
          }
        },
        error: (err) => {
          this.error = 'An error occurred. Please try again.';
          console.error('Login error:', err);
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}