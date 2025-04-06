import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  username = 'John Doe';
  email = 'johndoe@example.com';
  products = [
    { name: 'Laptop', description: 'High-performance laptop', price: 1200 },
    { name: 'Smartphone', description: 'Latest smartphone', price: 800 },
    { name: 'Headphones', description: 'Noise-cancelling headphones', price: 150 }
  ];
  logout() {
    console.log('Logging out...');
  }
}
