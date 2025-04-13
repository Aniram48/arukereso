import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements  OnInit{
  @Input() sidenav!: MatSidenav;
  @Output() closeMenu = new EventEmitter<void>();
  isLoggedIn: boolean = false;
  constructor(private usersService: UsersService) {}

  ngOnInit(): void{
    this.isLoggedIn = this.usersService.isLoggedIn();
  }
  
  close(){
    if(this.sidenav){
      this.sidenav.close();
      this.closeMenu.emit();
    }
  }
}
