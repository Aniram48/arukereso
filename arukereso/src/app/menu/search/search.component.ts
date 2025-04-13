import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MoneyPipe } from '../../money.pipe';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
@Component({
  selector: 'app-search',
  imports: [NgFor, NgIf, FormsModule, RouterModule,MoneyPipe,
    MatFormFieldModule,MatCardModule,MatSelectModule
   ],
  templateUrl: './search.component.html',
  standalone: true,
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  products: Product[] = [];
  
  filteredProducts: Product[] = [];

  searchTerm: string = '';

  selectedCategory: string = '';
 
  minPrice: number = 0;
  maxPrice: number = 100;
  priceMax: number = 500;
  showPriceFilter: boolean = false;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.filteredProducts = this.productService.getAllProducts();
    const highestPrice = Math.max(...this.filteredProducts.map(p => p.price));
    this.priceMax = Math.ceil(highestPrice / 100) * 100; 
    this.maxPrice = this.priceMax;
   
  }
  togglePriceFilter() {
    this.showPriceFilter = !this.showPriceFilter;
  }
  search(): void {
    this.filteredProducts = this.productService.searchProducts(this.searchTerm, this.selectedCategory);
    this.filteredProducts = this.productService.searchProductsWithFilters(
      this.searchTerm, 
      this.selectedCategory,
      this.minPrice,
      this.maxPrice
    );
  }
}
