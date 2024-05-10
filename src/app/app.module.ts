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


import { ProfileComponent } from './profile/profile.component'


import { AuthInterceptor } from './services/auth.interceptor';
import { MortgageComponent } from './mortgage/mortgage.component';
import { AuthGuard } from './auth.guard';
import { ApplyLoanComponent } from './Loan/Apply For Home/loan form/Applyloan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { SimulatorComponent } from './Loan/Simulator/Simulator.component';
import { packComponent } from './Loan/PackLoan/pack.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AccordionModule } from 'primeng/accordion';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { BackOfficeComponent } from './back-office/back-office.component';
import { SpinnerComponent } from './back-office/shared/spinner.component';
import { FullComponent } from './back-office/layouts/full/full.component';
import { NavigationComponent } from './back-office/shared/header/navigation.component';
import { SidebarComponent } from './back-office/shared/sidebar/sidebar.component';

import { expensesComponent } from './Loan/expenses Loan/expenses.component';



import { GarantorComponent } from './Loan/Apply For Home/Garantor Form/Garantor.component';
import { uploadComponent } from './Loan/Apply For Home/upload Form/upload.component';


import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { InsuranceComponent } from './insurance/insurance.component';
import { AddInsuranceComponent } from './insurance/add-insurance/add-insurance.component';
import { ViewInsuranceComponent } from './insurance/view-insurance/view-insurance.component';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CarouselModule } from 'primeng/carousel';
import { CurrencyComponent } from './currency/currency.component';
import { AddSinisterComponent } from './insurance/view-insurance/add-sinister/add-sinister.component';
import { ViewSinisterComponent } from './insurance/view-insurance/view-sinister/view-sinister.component';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { SinisterMapComponent } from './insurance/sinister-map/sinister-map.component';
import { SinisterUpdateComponent } from './insurance/sinister-update/sinister-update.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { SidebarModule } from 'primeng/sidebar';

import { SliderModule } from 'primeng/slider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TreeSelectModule } from 'primeng/treeselect';
import { ImageModule } from 'primeng/image';
import { DragDropModule } from 'primeng/dragdrop';


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

import { DropdownModule } from 'primeng/dropdown';



import { InvestorsComponent } from './investment/investors/investors.component';





import { BalanceComponent } from './Loan/expenses Loan/balance/balance.component';
import { IncomeExpensesComponent } from './Loan/expenses Loan/income-expenses/income-expenses.component';
import { TransactionListComponent } from './Loan/expenses Loan/transaction-list/transaction-list.component';
import { AddTransactionComponent } from './Loan/expenses Loan/add-transaction/add-transaction.component';

import { TransactionItemComponent } from './Loan/expenses Loan/transaction-list/transaction-item/transaction-item.component';

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
    InsuranceComponent,
    AddInsuranceComponent,
    ViewInsuranceComponent,
    CurrencyComponent,
    AddSinisterComponent,
    ViewSinisterComponent,
    SinisterMapComponent,
    SinisterUpdateComponent,
    EditProfileComponent,
    ChnagePasswordComponent,
    ForgetPasswordComponent,

    expensesComponent , 
    BalanceComponent , 
    IncomeExpensesComponent , 
    TransactionListComponent,
    AddTransactionComponent ,
    TransactionItemComponent,
    ProductListComponent,
    AddProductComponent,
    ProductDetailsComponent,
    CartComponent,
    CartDetailComponent,
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
    InvestorsComponent,
    
   ],

  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgxTypedJsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule ,
    ReactiveFormsModule,
 
    
  ],
 
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } , AuthGuard , NonauthGuard ],

  bootstrap: [AppComponent]
})
export class AppModule { }
