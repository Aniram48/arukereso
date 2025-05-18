import { Injectable, inject, NgZone } from '@angular/core';
import { Auth, authState, User, UserCredential, signOut, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  current: Observable<User | null>;

  constructor(
    private auth: Auth,
    private router: Router,
    private ngZone: NgZone 
  ) {
    this.current = authState(this.auth);
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    
    return this.ngZone.runOutsideAngular(() => {
      return signInWithEmailAndPassword(this.auth, email, password);
    });
  }

  signOut(): Promise<void> {
    return this.ngZone.runOutsideAngular(() => {
      localStorage.setItem('isLoggedIn', 'false');
      return signOut(this.auth).then(() => {
        this.ngZone.run(() => {
          this.router.navigateByUrl('/home');
        });
      });
    });
  }

  isLoggedIn(): Observable<User | null> {
    return this.current;
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }
}