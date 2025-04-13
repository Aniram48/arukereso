
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { MoneyPipe } from '../../money.pipe';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [CommonModule,RouterModule,MoneyPipe]
})
export class ProductComponent implements OnInit {
  product: any;
  selectedSize: string | null = null; 
  

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.product = this.productService.getProductById(id);
    });
  }
  addToCart(product: any) {
    this.cartService.addToCart({ ...product, selectedSize: this.selectedSize });
    this.router.navigate(['/cart']);
  }
  selectSize(size: string) {
    this.selectedSize = size;
  }

goToSearch() {
  this.router.navigate(['/search']);
}
  
}
