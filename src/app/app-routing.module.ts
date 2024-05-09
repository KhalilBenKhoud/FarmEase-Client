import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { MortgageComponent } from './mortgage/mortgage.component';
import { AuthGuard } from './auth.guard';
import { BackOfficeComponent } from './back-office/back-office.component';
import { FullComponent } from './back-office/layouts/full/full.component';
import { FrontOrBackService } from './services/front-or-back.service';
import { AdminResolver } from './admin.resolver';
import { AddProductComponent } from './add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path : "", component: HomeComponent, pathMatch: 'full' },
  {path : "home", component: HomeComponent },
  {path : "login" , component : LoginComponent },
  {path : "signup" , component : SignupComponent},
  {path : "profile" , component : ProfileComponent, canActivate: [AuthGuard]},
  {path : "mortgage" , component : MortgageComponent , canActivate: [AuthGuard]} ,
  {path:"Addproduct" ,component:AddProductComponent},
  {path:"Cart" ,component:CartComponent},
  {path:"Cartdetail" ,component:CartDetailComponent},
  {path:"Allproduct",component:ProductListComponent},
  { path: 'product/:id', component: ProductDetailsComponent } ,
  {path : "" , component : FullComponent , canActivate: [AuthGuard] ,children : [
    
        {
          path: 'dashboard',
          loadChildren: () => import('./back-office/dashboard/dashboard.module').then(m => m.DashboardModule),
          resolve : {data : AdminResolver }
        },
        {
          path: 'component',
          loadChildren: () => import('./back-office/component/component.module').then(m => m.ComponentsModule)
        }
      ]}
 ,
  {path: "**", component: NotFoundComponent }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
