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


import { ApplyLoanComponent } from './Loan/Apply For Home/loan form/Applyloan.component';
import { GarantorComponent } from './Loan/Apply For Home/Garantor Form/Garantor.component';
import { SimulatorComponent } from './Loan/Simulator/Simulator.component';
import { uploadComponent } from './Loan/Apply For Home/upload Form/upload.component';
import { packComponent } from './Loan/PackLoan/pack.component';


const routes: Routes = [
  {path : "", component: HomeComponent, pathMatch: 'full' },
  {path : "home", component: HomeComponent },
  {path : "login" , component : LoginComponent },
  {path : "signup" , component : SignupComponent},
  {path : "profile" , component : ProfileComponent, canActivate: [AuthGuard]},
  {path : "mortgage" , component : MortgageComponent , canActivate: [AuthGuard]} ,
  {path : "ApplyLoan" , component : ApplyLoanComponent , canActivate: [AuthGuard]} ,
  {path : "Garantor" , component : GarantorComponent , canActivate: [AuthGuard]} ,
  {path : "Simulator" , component : SimulatorComponent , canActivate: [AuthGuard]} ,
  {path : "upload" , component : uploadComponent , canActivate: [AuthGuard]}, 
  {path : "PackLoan" , component : packComponent , canActivate: [AuthGuard]},
  
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
