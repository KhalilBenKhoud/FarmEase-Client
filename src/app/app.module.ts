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
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';
import { MortgageComponent } from './mortgage/mortgage.component';
import { AuthGuard } from './auth.guard';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BackOfficeComponent } from './back-office/back-office.component';
import { SpinnerComponent } from './back-office/shared/spinner.component';
import { FullComponent } from './back-office/layouts/full/full.component';
import { NavigationComponent } from './back-office/shared/header/navigation.component';
import { SidebarComponent } from './back-office/shared/sidebar/sidebar.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { InvestmentComponent } from './investment/investment.component';
import { ProjectComponent } from './investment/project/project.component';
import { ProjectDetailsComponent } from './investment/project-details/project-details.component';
import { ShowProjectComponent } from './investment/show-project/show-project.component';
import { AddProjectFormComponent } from './investment/add-project-form/add-project-form.component';
import { CreateProjectComponent } from './investment/create-project/create-project.component';
import { InvestFormComponent } from './investment/invest-form/invest-form.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { NonauthGuard } from './nonauth.guard';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TabViewModule } from 'primeng/tabview';
import { ChnagePasswordComponent } from './profile/chnage-password/chnage-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';



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
    BackOfficeComponent,
    SpinnerComponent,
    InvestmentComponent,
    ProjectComponent,
    ProjectDetailsComponent,
    ShowProjectComponent,
    AddProjectFormComponent,
    CreateProjectComponent,
    InvestFormComponent,
    EditProfileComponent,
    ChnagePasswordComponent,
    ForgetPasswordComponent,
    
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxTypedJsModule,
    HttpClientModule,
    FormsModule,
    ButtonModule,
    BrowserAnimationsModule,
    AccordionModule,
    NgbModule,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    ToastModule,
    MessagesModule,
    ReactiveFormsModule,
    ProgressBarModule,
    OverlayPanelModule,
    TimelineModule,
    CardModule,
    DialogModule,
    InputTextModule,
    AvatarModule,
    SelectButtonModule,
    TabViewModule,
    ReactiveFormsModule
  ],
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } , AuthGuard , NonauthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
