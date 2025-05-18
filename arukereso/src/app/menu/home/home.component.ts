import { Component,OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router, RouterModule } from '@angular/router';
import { MoneyPipe } from '../../money.pipe';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports:[RouterModule,CommonModule,MoneyPipe,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class HomeComponent implements OnInit{
  featuredProducts: any[] = [];
  constructor(private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
   
    console.log('ngOnInit called');
    this.featuredProducts = this.productService.getRandomProducts(4);
    console.log('Featured products:', this.featuredProducts);
  }

  goToSearch() {
    this.router.navigate(['/search']);
    
  }
}