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
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user'; 

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
    private snackBar: MatSnackBar,
    private auth: Auth 
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

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const { name, email, password } = this.registerForm.value;

      createUserWithEmailAndPassword(this.auth, email, password)
        .then(userCredential => {
          const firebaseUser = userCredential.user;

          const newUser: User = {
            id: firebaseUser.uid,
            name,
            email: firebaseUser.email || '',
            phone: '-',
            bio: '-',
            image: 'assets/images/profile.png',
            products: [] 
          };

          this.usersService.setUserData(newUser);

          this.isLoading = false;
          this.snackBar.open('Sikeres regisztráció!', 'Bezár', {
            duration: 5000,
            panelClass: ['success-snackbar']
          });

          this.router.navigate(['/profile']);
        })
        .catch(error => {
          this.isLoading = false;
          this.snackBar.open('Regisztrációs hiba: ' + error.message, 'Bezár', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
          console.error('Register error:', error);
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