 import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';
  
  private users = [
    { 
      name: 'Judit', 
      email: 'judit48@gmail.com', 
      password: 'Judit04',
      phone: '+36 30 111 2233',
      bio: 'Ez Judit bemutatkozása.',
      image: 'assets/images/profile.png',
      products: [],
      roles: ['user']
    }
  ];

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly USER_DATA_KEY = 'userData';
  constructor() {
    this.loadUserState();
  }

  private loadUserState(): void {
    const token = this.getToken();
    if (token) {
      const savedUser = localStorage.getItem(this.USER_KEY);
      if (savedUser) {
        const user = JSON.parse(savedUser);
        this.currentUserSubject.next(user);
      } else {
        this.logout();
      }
    }
  }

  login(email: string, password: string): Observable<void> {
    const user = this.users.find(u => u.email === email && u.password === password);

    if (user) {
      
      const userInfo = { ...user };
      
      localStorage.setItem(this.USER_KEY, JSON.stringify(userInfo));
      this.setToken('fake-jwt-token');
      
      this.currentUserSubject.next(userInfo);
      
      return of(void 0);
    } else {
      return throwError(() => new Error('Hibás bejelentkezési adatok'));
    }
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  getUserData() {
    return this.currentUserSubject.value;
  }

  setUserData(userData: any): void {
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
  }
  updateUser(updatedUser: any): Observable<void> {
    const currentUser = this.getUserData();
    if (!currentUser) return of(void 0);

    const updated = { ...currentUser, ...updatedUser };
    
    if (updatedUser.password) {
      updated.password = updatedUser.password;
    }

    const index = this.users.findIndex(u => u.email === updated.email);
    if (index !== -1) {
      this.users[index] = updated;
    }

    localStorage.setItem(this.USER_KEY, JSON.stringify(updated));
    this.currentUserSubject.next(updated);

    return of(void 0);
  }

  addPurchasedItems(items: any[]): void {
    const user = this.getUserData();
    if (user) {
      if (!user.products) {
        user.products = [];
      }
      user.products.push(...items);

      this.currentUserSubject.next(user);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }
  getPurchasedItems(): any[] {
  const user = this.getUserData();
  return user && user.products ? user.products : [];
}

  
}