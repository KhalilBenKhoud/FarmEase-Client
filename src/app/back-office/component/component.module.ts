import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { InsuranceComponent } from './insurance/insurance.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { InvestmentComponent } from './investment/investment.component';
import { CardsComponent } from './card/card.component';
import { LoanComponent } from './loan/loan.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { MortgagebackComponent } from './mortgageback/mortgageback.component';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { PostbackComponent } from './postback/postback.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { MessageService } from 'primeng/api';

@NgModule({
  
  declarations:[
  MortgagebackComponent,
  PostbackComponent,
  
],
 
  
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    ButtonModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    InsuranceComponent,
    LoanComponent,
    NgbdDropdownBasicComponent,
    NgbdnavBasicComponent,
    InvestmentComponent,
    CardsComponent,
    FormsModule,
    MarketplaceComponent,
    DialogModule,
    MultiSelectModule,
    RatingModule,
   
    MarketplaceComponent ,
    MarketplaceComponent,
    TableModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    MarketplaceComponent,


  ],

  providers: [
    MessageService // Add MessageService to providers
  ]
})
export class ComponentsModule { }