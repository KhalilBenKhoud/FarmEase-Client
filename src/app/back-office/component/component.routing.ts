import { Routes } from '@angular/router';
import { InsuranceComponent } from './insurance/insurance.component';
import { LoanComponent } from './loan/loan.component';

import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdnavBasicComponent } from './nav/nav.component';

import { InvestmentComponent } from './investment/investment.component';
import { CardsComponent } from './card/card.component';
import { MortgageComponent } from './mortgage/mortgage';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { AdminResolver } from 'src/app/admin.resolver';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'marketplace',
				component: MarketplaceComponent,
				resolve : {data : AdminResolver }
			},
			{
				path: 'card',
				component: CardsComponent,
				resolve : {data : AdminResolver }
			},
			{
				path: 'insurance',
				component: InsuranceComponent,
				resolve : {data : AdminResolver }
			},
			{
				path: 'mortgages',
				component: MortgageComponent,
				resolve : {data : AdminResolver }
			},
			{
				path: 'loans',
				component: LoanComponent,
				resolve : {data : AdminResolver }
			},
			{
				path: 'dropdown',
				component: NgbdDropdownBasicComponent,
				resolve : {data : AdminResolver }
			},
			{
				path: 'nav',
				component: NgbdnavBasicComponent,
				resolve : {data : AdminResolver }
			},
			{
				path: 'investment',
				component: InvestmentComponent,
				resolve : {data : AdminResolver }
			}
		]
	}
];