
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
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
export class RegComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;
  
  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { 
      validators: this.passwordMatchValidator 
    });
  }
  
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ 'passwordMismatch': true });
      return { passwordMismatch: true };
    }
    
    return null;
  }
  
 /*  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { name, email, password } = this.registerForm.value;
  
      this.usersService.register(name, email, password).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open('Sikeres regisztráció! Kérjük, jelentkezz be.', 'Bezár', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          
          this.usersService.login(email, password).subscribe({
            next: () => {
              this.router.navigate(['/dashboard']); 
            },
            error: (err) => {
              console.error('Login error after registration:', err);
              this.snackBar.open('Hiba történt a bejelentkezés során.', 'Bezár', {
                duration: 5000,
                panelClass: ['error-snackbar']
              });
            }
          });
        },
        error: (err) => {
          this.isLoading = false;
          this.snackBar.open('A regisztráció sikertelen. Kérjük, próbáld újra.', 'Bezár', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          console.error('Registration error:', err);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  } */
    onSubmit() {
      if (this.registerForm.valid) {
        this.isLoading = true;
        const { name, email, password } = this.registerForm.value;
  
        // Regisztrációs logika: Ha az email nem található meg a felhasználók között, hozzáadjuk
        const userExists = this.usersService.isLoggedIn();
        
        // Itt most a regisztráció csak akkor történik, ha nincs bejelentkezve
        if (userExists) {
          this.snackBar.open('Jelenleg már be vagy jelentkezve.', 'Bezár', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          return;
        }
  
        // A felhasználó validálása a szolgáltatásban
        this.usersService.login(email, password).subscribe({
          next: () => {
            this.isLoading = false;
            this.snackBar.open('Sikeres bejelentkezés!', 'Bezár', {
              duration: 5000,
              panelClass: ['success-snackbar']
            });
            this.router.navigate(['/profile']); // Navigálj a profil oldalra
          },
          error: (err) => {
            this.isLoading = false;
            this.snackBar.open('Hibás bejelentkezési adatok.', 'Bezár', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
            console.error('Login error:', err);
          }
        });
      } else {
        this.registerForm.markAllAsTouched();
      }
    }
  
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  getNameErrorMessage() {
    return this.registerForm.get('name')?.hasError('required') ? 'A név megadása kötelező' : '';
  }

  getEmailErrorMessage() {
    if (this.registerForm.get('email')?.hasError('required')) {
      return 'Az email cím megadása kötelező';
    }
    return this.registerForm.get('email')?.hasError('email') ? 'Érvénytelen email formátum' : '';
  }

  getPasswordErrorMessage() {
    if (this.registerForm.get('password')?.hasError('required')) {
      return 'A jelszó megadása kötelező';
    }
    return this.registerForm.get('password')?.hasError('minlength') ? 
           'A jelszónak legalább 6 karakterből kell állnia' : '';
  }

  getConfirmPasswordErrorMessage() {
    if (this.registerForm.get('confirmPassword')?.hasError('required')) {
      return 'A jelszó megerősítése kötelező';
    }
    return this.registerForm.get('confirmPassword')?.hasError('passwordMismatch') ? 
           'A jelszavak nem egyeznek' : '';
  }
}