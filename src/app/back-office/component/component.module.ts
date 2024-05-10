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
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MortgageComponent } from './mortgage/mortgage';
import { FileUploadModule } from 'primeng/fileupload';

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
    MarketplaceComponent,
    TableModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    MarketplaceComponent,
    FileUploadModule,
     
  ],
  declarations: [
    MarketPlaceComponent,
  ],
  providers: [
    MessageService // Add MessageService to providers
  ]
})
export class ComponentsModule { }
