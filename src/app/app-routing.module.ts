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
import { InsuranceComponent } from './insurance/insurance.component';
import { AddInsuranceComponent } from './insurance/add-insurance/add-insurance.component';
import { ViewInsuranceComponent } from './insurance/view-insurance/view-insurance.component';
import { AddSinisterComponent } from './insurance/view-insurance/add-sinister/add-sinister.component';
import { ViewSinisterComponent } from './insurance/view-insurance/view-sinister/view-sinister.component';
import { CurrencyComponent } from './currency/currency.component';
import { SinisterMapComponent } from './insurance/sinister-map/sinister-map.component';
import { NonauthGuard } from './nonauth.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  {path : "", component: HomeComponent, pathMatch: 'full' },
  {path : "home", component: HomeComponent },
  {path : "login" , component : LoginComponent , canActivate: [NonauthGuard] },
  {path : "signup" , component : SignupComponent,  canActivate: [NonauthGuard]},
  {path : "forgetPassword" , component : ForgetPasswordComponent,  canActivate: [NonauthGuard]},
  {path : "profile" , component : ProfileComponent, canActivate: [AuthGuard]},
  {path : "mortgage" , component : MortgageComponent , canActivate: [AuthGuard]} ,
  {path : "insurance" , component : InsuranceComponent , canActivate: [AuthGuard]} ,
  {path : "addInsurance" , component : AddInsuranceComponent , canActivate: [AuthGuard]} ,
  {path : "viewInsurance" , component : ViewInsuranceComponent , canActivate: [AuthGuard]} ,
  {path : "addSinister/:id" , component : AddSinisterComponent , canActivate: [AuthGuard]} ,
  {path : "viewSinister/:id" , component : ViewSinisterComponent , canActivate: [AuthGuard]} ,
  {path : "currencyConvert" , component : CurrencyComponent , canActivate: [AuthGuard]} ,
  {path : "sinisterMap" , component : SinisterMapComponent , canActivate: [AuthGuard]} ,
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
