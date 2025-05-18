import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './always/menu/menu.component';
import { FormsModule } from '@angular/forms';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router'; 
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from './services/users.service';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs'; 


@Component({
  selector: 'app-root',
  
  imports: [RouterOutlet, 
    MenuComponent,
    FormsModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  
})
export class AppComponent {
  title = 'arukereso';
  
  isLoggedIn: boolean = false;
  private userSubscription: Subscription | undefined;

  constructor(private usersService: UsersService) {}

  sideNav(sidenav:MatSidenav){
    sidenav.toggle();
  }
  ngOnInit(): void {
      this.userSubscription = this.usersService.currentUser$.subscribe(user => {
        this.isLoggedIn = !!user; 
      });
  }
  ngOnDestroy(): void {
      if (this.userSubscription) {
        this.userSubscription.unsubscribe();  
      }
  }

}
