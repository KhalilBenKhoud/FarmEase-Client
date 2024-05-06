import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import { InsuranceComponent } from './insurance/insurance.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';
import { InvestmentComponent } from './investment/investment.component';
import { CardsComponent } from './card/card.component';
import { LoanComponent } from './loan/loan.component';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { BrowserModule } from '@angular/platform-browser';

import { MortgagebackComponent } from './mortgageback/mortgageback.component';
@NgModule({
 
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    InsuranceComponent,
    LoanComponent,
    NgbdDropdownBasicComponent,
    NgbdnavBasicComponent,
    InvestmentComponent,
    CardsComponent,
    MortgagebackComponent,
    MarketplaceComponent,
    BrowserModule,
  
    
  ],
})
export class ComponentsModule { }
