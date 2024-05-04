import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { MortgageComponent } from './mortgage/mortgage.component';
import { AuthGuard } from './auth.guard';
import { InsuranceComponent } from './insurance/insurance.component';
import { InsuranceListComponent } from './insurance-list/insurance-list.component';

const routes: Routes = [
  {path : "", component: HomeComponent, pathMatch: 'full' },
  {path : "home", component: HomeComponent },
  {path : "login" , component : LoginComponent },
  {path : "signup" , component : SignupComponent},
  {path : "profile" , component : ProfileComponent, canActivate: [AuthGuard]},
  {path : "mortgage" , component : MortgageComponent , canActivate: [AuthGuard]} ,
  {path : "insurance" , component : InsuranceListComponent , canActivate: [AuthGuard]} ,
  {path: "**", component: NotFoundComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
