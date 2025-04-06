import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [NgFor, NgIf ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchQuery="";
  products = [
    { name: 'Laptop', description: 'High-performance laptop', price: 1200 },
    { name: 'Smartphone', description: 'Latest smartphone', price: 800 },
    { name: 'Headphones', description: 'Noise-cancelling headphones', price: 150 },
    { name: 'Smartwatch', description: 'Smartwatch with fitness tracking', price: 250 },
    { name: 'Tablet', description: 'Portable tablet', price: 400 },
    { name: 'Apple', description: 'Delicious apple', price: 50 },
    { name: 'Apple', description: 'Delicious apple', price: 50 }
  ];
  filteredProducts = this.products;
  search() {
    if (this.searchQuery.trim() !== '') {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
}
