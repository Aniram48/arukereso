
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MoneyPipe } from '../../money.pipe';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports:[CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MoneyPipe
  ],
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = []; 
  }

  removeItem(index: number): void {
    const cart = this.cartService.getCart();
    cart.splice(index, 1);
    this.cartService.updateCart(cart);
    this.cartItems = cart; 
  }

  checkout(): void {
    this.router.navigate(['/search']);
  }

    purchaseItems(): void {
      if (this.cartItems.length > 0) {
        this.usersService.addPurchasedItems(this.cartItems);

        this.cartService.clearCart();
        this.cartItems = []; 
        this.router.navigate(['/profile']);
      } else {
        console.log('No items in the cart');
      }
    }
}

