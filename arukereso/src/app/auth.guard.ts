import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private auth = inject(Auth);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return authState(this.auth).pipe(
      map(user => {
        const isLoggedIn = !!user;
        console.log('AuthGuard: user logged in?', isLoggedIn, user);
        return isLoggedIn;
      }),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('AuthGuard: Not logged in, redirecting to /login');
          this.router.navigate(['/login']);
        } else {
          console.log('AuthGuard: Access granted');
        }
      })
    );
  }
}
