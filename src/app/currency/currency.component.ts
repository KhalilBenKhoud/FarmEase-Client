import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent {
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  amount: number = 1;
  convertedAmount: any;


  currencies: string[] = ['USD', 'EUR', 'GBP']; // Add more currencies as needed
  //premium

  coverageAmount!: number;
  location!: string;
  irrigated!: boolean;
  franchise!: number;
  period!: number;
  policy!: string;
  premiumResult!: number;

  constructor(private currencyService: CurrencyService) { }

  convertCurrency() {
    this.currencyService.convertCurrency(this.amount, this.fromCurrency, this.toCurrency)
      .subscribe(convertedAmount => {
        console.log(convertedAmount);
        this.convertedAmount = convertedAmount;
      }, error => {
        console.error('Failed to convert currency:', error);
      });
  }

  calculatePremium() {
    // Your premium calculation logic goes here
    const basePremium = this.coverageAmount * 0.02; // Example calculation
    let locationFactor = 1;
    if (this.location === "north") {
      locationFactor = 1.1;
    } else if (this.location === "south") {
      locationFactor = 0.9;
    }
    const irrigatedFactor = this.irrigated ? 1.05 : 1;
    const franchiseFactor = 1 - (this.franchise / 100);
    const periodFactor = this.period / 12;
    let policyFactor = 1;
    if (this.policy === "drought") {
      policyFactor = 1.2;
    } else if (this.policy === "flood") {
      policyFactor = 1.3;
    } else if (this.policy === "fire") {
      policyFactor = 1.1;
    }

    this.premiumResult = basePremium * locationFactor * irrigatedFactor * franchiseFactor * periodFactor * policyFactor*100;
  }
}