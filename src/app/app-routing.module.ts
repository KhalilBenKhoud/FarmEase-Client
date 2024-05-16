import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { MortgageComponent } from './mortgage/mortgage.component';
import { AuthGuard } from './auth.guard';
import { FullComponent } from './back-office/layouts/full/full.component';
import { AdminResolver } from './admin.resolver';

import { expensesComponent } from './Loan/expenses Loan/expenses.component';

import { ApplyLoanComponent } from './Loan/Apply For Home/loan form/Applyloan.component';
import { GarantorComponent } from './Loan/Apply For Home/Garantor Form/Garantor.component';
import { SimulatorComponent } from './Loan/Simulator/Simulator.component';
import { uploadComponent } from './Loan/Apply For Home/upload Form/upload.component';
import { packComponent } from './Loan/PackLoan/pack.component';

import { AddProductComponent } from './add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProjectComponent } from './investment/project/project.component';
import { ProjectDetailsComponent } from './investment/project-details/project-details.component';
import { ShowProjectComponent } from './investment/show-project/show-project.component';
import { AddProjectFormComponent } from './investment/add-project-form/add-project-form.component';
import { CreateProjectComponent } from './investment/create-project/create-project.component';
import { NonauthGuard } from './nonauth.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { InvestorsComponent } from './investment/investors/investors.component';

const routes: Routes = [
  {path : "", component: HomeComponent, pathMatch: 'full' },
  {path : "home", component: HomeComponent },
  {path : "login" , component : LoginComponent , canActivate: [NonauthGuard] },
  {path : "signup" , component : SignupComponent,  canActivate: [NonauthGuard]},
  {path : "forgetPassword" , component : ForgetPasswordComponent,  canActivate: [NonauthGuard]},
  {path : "profile" , component : ProfileComponent, canActivate: [AuthGuard]},
  {path : "projects" , component : ProjectComponent, canActivate: [AuthGuard]},
  {path : "backers" , component : InvestorsComponent, canActivate: [AuthGuard]},


  {path : "createproject" , component : AddProjectFormComponent, canActivate: [AuthGuard]},
  {path : "details/:id" , component : ProjectDetailsComponent, canActivate: [AuthGuard]},
  {path : "projects2" , component : ShowProjectComponent, canActivate: [AuthGuard]},
  {path : "mortgage" , component : MortgageComponent , canActivate: [AuthGuard]} ,

  {path : "ApplyLoan" , component : ApplyLoanComponent , canActivate: [AuthGuard]} ,
  {path : "Garantor" , component : GarantorComponent , canActivate: [AuthGuard]} ,
  {path : "Simulator" , component : SimulatorComponent , canActivate: [AuthGuard]} ,
  {path : "upload" , component : uploadComponent , canActivate: [AuthGuard]}, 
  {path : "PackLoan" , component : packComponent , canActivate: [AuthGuard]},
  {path : "expenses" , component : expensesComponent , canActivate: [AuthGuard]},
  {path:"Addproduct" ,component:AddProductComponent, canActivate: [AuthGuard]},
  {path:"Cart" ,component:CartComponent, canActivate: [AuthGuard]},
  {path:"Cartdetail" ,component:CartDetailComponent, canActivate: [AuthGuard]},
  {path:"Allproduct",component:ProductListComponent, canActivate: [AuthGuard]},
  { path: 'product/:id', component: ProductDetailsComponent , canActivate: [AuthGuard]} ,

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
