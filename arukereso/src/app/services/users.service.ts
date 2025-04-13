import { Injectable } from '@angular/core';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs'; 


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
      products:[]
    }
  ];

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

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
      const userInfo = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        image: user.image,
        products: user.products
      };
      
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

    updateUser(updatedUser: any): Observable<void> {
      const currentUser = JSON.parse(localStorage.getItem(this.USER_KEY) || '{}');
      
     
      if (updatedUser.password) {
        updatedUser.password = updatedUser.password;  
      }
    
    
      if (currentUser && currentUser.email) {
        const index = this.users.findIndex(user => user.email === currentUser.email);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...updatedUser };
          localStorage.setItem(this.USER_KEY, JSON.stringify(this.users[index])); 
        }
      }
    
      return of(void 0);
    }
    private purchasedItems: any[] = [];
 
    
    getPurchasedItems(): any[] {
      return this.purchasedItems;
    }

   addPurchasedItems(items: any[]) {
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
    

}