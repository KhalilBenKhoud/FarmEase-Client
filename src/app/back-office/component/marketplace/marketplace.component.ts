import { Component } from '@angular/core';
import { Product, TopSelling, TableRows, Employee } from './table-data';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-table',
  standalone: true,
  imports:[NgFor],
  templateUrl: 'marketplace.component.html'
})
export class MarketplaceComponent {
  topSelling: Product[];

  trow: TableRows[];

  constructor() {

    this.topSelling = TopSelling;

    this.trow = Employee;
  }
}
