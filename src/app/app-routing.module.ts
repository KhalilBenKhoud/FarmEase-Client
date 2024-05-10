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
