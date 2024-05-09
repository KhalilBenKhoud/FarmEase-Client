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
}