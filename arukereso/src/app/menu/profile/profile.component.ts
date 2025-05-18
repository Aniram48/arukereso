import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { RatingComponent } from '../../rating.component';
import { CartService } from '../../services/cart.service';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgFor,
    MatDialogModule,
    RatingComponent
  ]
})
export class ProfileComponent implements OnInit {
  user: any;
  purchasedProducts: any[] = [];
  cartItems: any[] = [];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private dialog: MatDialog,
    private cartService: CartService,
    private auth: Auth
  ) {}

  /*ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = this.usersService.getUserData();
        this.purchasedProducts = this.usersService.getPurchasedItems();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }*/

ngOnInit() {
  onAuthStateChanged(this.auth, (user) => {
    if (user) {
      const userData = this.usersService.getUserData();

      if (userData) {
        this.user = userData;
        this.purchasedProducts = this.cartService.getCartItems(); // innen kérdezd le
        console.log('User data loaded:', this.user);
      } else {
        this.user = {
          name: 'Valaki',
          email: user.email || '-',
          phone: '-',
          bio: '-',
          image: 'assets/images/profile.png',
          products: []
        };
        this.purchasedProducts = this.cartService.getCartItems();
        console.log('Default user data set (missing local data):', this.user);
      }
    } else {
      this.router.navigate(['/login']);
    }
  });
}

  logout(): void {
  signOut(this.auth).then(() => {
    this.router.navigate(['/home']);
  }).catch((error) => {
    console.error('Logout error:', error);
  });
}

  editProfile(): void {
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = { ...result, products: this.user.products };
      }
    });
  }

  removeProduct(product: any): void {
    this.user.products = this.user.products.filter((p: any) => p.id !== product.id);
  }
}