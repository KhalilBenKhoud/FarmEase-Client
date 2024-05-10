import { Injectable } from '@angular/core';
import { Transaction } from '../Models/expenses';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor() {
    // Chargez les transactions sauvegardées lors de l'initialisation du service
    this.loadTransactions();
  }

  private getAmounts(): number[] {
    return this.transactions.map((transaction: Transaction) => transaction.amount);
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getTotal(): string {
    const amounts = this.getAmounts();
    return amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  }

  getExpense(): string {
    const amounts = this.getAmounts();
    return (
      amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);
  }

  getIncome(): string {
    const amounts = this.getAmounts();
    return amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
  }

  delete(id: number) {
    this.transactions = this.transactions.filter((transaction) => transaction.id !== id);
    this.saveTransactions(); // Sauvegarder après la suppression
  }

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
    this.saveTransactions(); // Sauvegarder après l'ajout
  }

  private saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }


  // Mettez loadTransactions en public
  public loadTransactions() {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      this.transactions = JSON.parse(savedTransactions);
    }
  }
}
