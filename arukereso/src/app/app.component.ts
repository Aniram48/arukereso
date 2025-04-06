import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './menu/search/search.component';
import { ProductComponent } from './menu/product/product.component';
import { ProfileComponent } from './menu/profile/profile.component';
import { CommonModule, NgIf } from '@angular/common';
import { HomeComponent } from './menu/home/home.component';
import { MenuComponent } from './always/menu/menu.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent,HomeComponent,SearchComponent, ProductComponent, ProfileComponent, NgIf, FormsModule,CommonModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'arukereso';
  actual = "search";
}
