import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../../../../Models/expenses';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
})
export class TransactionItemComponent {
  @Input() transaction!: Transaction;
  @Output() onDelete = new EventEmitter<number>();

  amount(amount: number) {
    return Math.abs(amount);
  }

  delete(id: number) {
    this.onDelete.emit(id);
  }
}
