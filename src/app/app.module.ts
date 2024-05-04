import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TitleComponent } from './home/title/title.component';
import { NgxTypedJsModule } from 'ngx-typed-js';
import  { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component'
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';
import { MortgageComponent } from './mortgage/mortgage.component';
import { AuthGuard } from './auth.guard';
import { InsuranceComponent } from './insurance/insurance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InsuranceListComponent } from './insurance-list/insurance-list.component';


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
    InsuranceComponent,
    InsuranceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxTypedJsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } , AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
