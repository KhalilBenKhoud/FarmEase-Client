import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../services/expenses.service';
import { Transaction } from '../../../Models/expenses';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
})
export class TransactionListComponent implements OnInit {
  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    // Chargez les transactions sauvegardées lors du chargement du composant
    this.transactionService.loadTransactions();
  }

  get transactionList(): Transaction[] {
    return this.transactionService.getTransactions();
  }

  deleteTransaction(id: number) {
    this.transactionService.delete(id);
  }
}
