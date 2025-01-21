import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {passwordMatchValidator} from './passwordMatchValidator';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  loading = false;
  errorMessages: { [key: string]: string } = {};
  registrationForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/)]),
    rePassword: new FormControl
  }, {validators: passwordMatchValidator});

  constructor(private router: Router, private authService: AuthService) {
  }

  register(): void {
    if (!this.registrationForm.valid) {
      return;
    }
    this.loading = true;
    this.authService.register(this.registrationForm.value).subscribe({
      next: (response): void => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
        this.loading = false;
      },
      error: (error): void => {
        this.loading = false;
        this.registrationForm.reset();
        this.errorMessages = error.error;
      }
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    }
  }
}
