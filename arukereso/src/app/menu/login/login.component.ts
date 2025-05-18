import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';

import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';

import { UserCredential } from '@angular/fire/auth';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  loginError: string = '';
  showLoginForm: boolean = true;
  authSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['alma@gmail.com', [Validators.required, Validators.email]], 
      password: ['Alma01', [Validators.required, Validators.minLength(6)]] 
    });
  }

  ngOnInit() {
    this.authSubscription = this.authService.isLoggedIn().subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/home');
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginError = 'Kérlek töltsd ki helyesen az adatokat.';
      this.loginForm.markAllAsTouched();
      return;
    }

    const emailValue = this.loginForm.get('email')?.value || '';
    const passwordValue = this.loginForm.get('password')?.value || '';

    this.isLoading = true;
    this.showLoginForm = false;
    this.loginError = '';

    this.authService.signIn(emailValue, passwordValue)
      .then((userCredential: UserCredential) => {
        console.log('Login successful:', userCredential.user);
        this.authService.updateLoginStatus(true);
        
      
        setTimeout(() => {
          this.router.navigateByUrl('/home');
        }, 500);
      })
      .catch((error: FirebaseError) => {
        console.error('Login error:', error);
        this.isLoading = false;
        this.showLoginForm = true;

        switch (error.code) {
          case 'auth/user-not-found':
            this.loginError = 'No account found with this email address';
            break;
          case 'auth/wrong-password':
            this.loginError = 'Incorrect password';
            break;
          case 'auth/invalid-credential':
            this.loginError = 'Invalid email or password';
            break;
          default:
            this.loginError = 'Authentication failed. Please try again later.';
        }
      });
  }

  navigateToRegister() {
    this.router.navigate(['/reg']);
  }

  getEmailErrorMessage() {
    const emailCtrl = this.loginForm.get('email');
    if (emailCtrl?.hasError('required')) {
      return 'Az email cím megadása kötelező';
    }
    if (emailCtrl?.hasError('email')) {
      return 'Érvénytelen email formátum';
    }
    return '';
  }

  getPasswordErrorMessage() {
    const passwordCtrl = this.loginForm.get('password');
    if (passwordCtrl?.hasError('required')) {
      return 'A jelszó megadása kötelező';
    }
    if (passwordCtrl?.hasError('minlength')) {
      return 'A jelszónak legalább 6 karakterből kell állnia';
    }
    return '';
  }
}