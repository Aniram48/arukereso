import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
  
})
export class CartService {
  private cartKey = 'user_cart';
  private cart: any[] = [];

  constructor(private usersService: UsersService) {}

  addToCart(product: any): void {
    const cart = this.getCart();
    cart.push(product);
    this.updateCart(cart);
  }

  getCart(): any[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  updateCart(cart: any[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }
  completePurchase() {
    const purchasedItems = [...this.cart]; 
    this.cart = []; 
    localStorage.setItem('cart', JSON.stringify(this.cart));
  
    this.usersService.addPurchasedItems(purchasedItems);
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
  transferToProfile() {
    const cartItems = this.getCart();
    this.usersService.addPurchasedItems(cartItems);
    this.clearCart();
  }
  
}
