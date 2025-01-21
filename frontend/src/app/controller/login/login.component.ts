import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AsyncPipe, NgIf} from '@angular/common';
import {Observable} from 'rxjs';
import {NotificationService} from '../../service/notification/notification.service';
import {AuthService} from '../../service/auth/auth.service';
import {Router, RouterLink, UrlTree} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  message$: Observable<string>;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private router: Router, private authService: AuthService, private notificationService: NotificationService) {
    this.message$ = this.notificationService.message$;
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response): void => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
        this.loading = false;
      },
      error: (): void => {
        this.loading = false;
        this.loginForm.reset();
        this.notificationService.updateMessage('Email hoặc mật khẩu không đúng!');
      }
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    }
  }
}
