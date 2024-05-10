import { Component } from '@angular/core';
import { TransactionService } from '../../../services/expenses.service';

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
})
export class IncomeExpensesComponent {
  constructor(private transactionService: TransactionService) {}

  get income(): string {
    return this.transactionService.getIncome();
  }

  get expense(): string {
    return this.transactionService.getExpense();
  }
}
