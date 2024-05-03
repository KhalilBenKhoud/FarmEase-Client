import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TitleComponent } from './home/title/title.component';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { MortgageComponent } from './mortgage/mortgage.component';
import { AuthGuard } from './auth.guard';
import { ApplyLoanComponent } from './Loan/Apply For Home/loan form/Applyloan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars'; 
import { SimulatorComponent } from './Loan/Simulator/Simulator.component';


import { packComponent } from './Loan/PackLoan/pack.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BackOfficeComponent } from './back-office/back-office.component';
import { SpinnerComponent } from './back-office/shared/spinner.component';
import { FullComponent } from './back-office/layouts/full/full.component';
import { NavigationComponent } from './back-office/shared/header/navigation.component';
import { SidebarComponent } from './back-office/shared/sidebar/sidebar.component';




import { GarantorComponent } from './Loan/Apply For Home/Garantor Form/Garantor.component';
import { uploadComponent } from './Loan/Apply For Home/upload Form/upload.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    TitleComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    MortgageComponent,
    ApplyLoanComponent,
    SimulatorComponent , 
    GarantorComponent , 
    uploadComponent , 
    packComponent ,
    BackOfficeComponent,
    SpinnerComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgxTypedJsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule , 
    HttpClientModule ,
 
  
  ],
  providers: [    
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, 
    AuthGuard ,

    BrowserAnimationsModule,

    NgbModule,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
