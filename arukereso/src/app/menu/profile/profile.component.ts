 import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgFor } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common'; 
import { MatDialog } from '@angular/material/dialog';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RatingComponent } from '../../rating.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-profile',
  
  imports: [RatingComponent, MatDialogModule, MatCardModule,MatButtonModule,MatIconModule,NgFor, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent  implements OnInit{
  user: any; 
  purchasedProducts: any[] = [];
  cartItems: any[] = [];
  constructor(
    private usersService: UsersService,
    private router: Router,
    private dialog: MatDialog,
    private cartService: CartService
  ) {}

  ngOnInit() {
    if (this.usersService.isLoggedIn()) {
      this.user = this.usersService.getUserData(); 
      this.purchasedProducts = this.usersService.getPurchasedItems();
    } else {
      
      this.router.navigate(['/login']);
    }
  }


  logout():void {
    this.usersService.logout(); 
    this.router.navigate(['/home'])
  }
  editProfile(): void {
    const dialogRef = this.dialog.open(ProfileEditComponent, {
      data: this.user 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this.user = { ...result, products: this.user.products };;
      }
    });
  }
  removeProduct(product: any): void {
    this.user.products = this.user.products.filter((p: any) => p.id !== product.id);
  }
}
 
