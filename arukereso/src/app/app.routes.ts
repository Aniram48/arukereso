import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './menu/home/home.component';
import { SearchComponent } from './menu/search/search.component';
import { ProfileComponent } from './menu/profile/profile.component';
import { ProductComponent } from './menu/product/product.component';
import { RegComponent } from './menu/reg/reg.component';
import { LoginComponent } from './menu/login/login.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './menu/cart/cart.component';

export const routes: Routes = [
    {
        path: 'home', title:'Home', component: HomeComponent
    },
    
    {
        path: 'search', title:'Search', component: SearchComponent
    },
    {
        path: 'profile', title:'Profile', component: ProfileComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'product/:id', title:'Product', component:ProductComponent,
        canActivate:[AuthGuard]
    },
    {
        path: 'reg', title:'Register', component: RegComponent
    },
    {
        path: 'login', title:'Login', component: LoginComponent
    },
    { path: 'cart', title:'Cart', component: CartComponent },
    
    {
        path: '**', title:'Home', component: HomeComponent
    }
];
export const AppRoutingModule = RouterModule.forRoot(routes);