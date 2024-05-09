import { Component } from '@angular/core';
import { Product, TopSelling, TableRows, Employee } from './table-data';
import { NgFor } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-table',
  standalone: true,
  imports:[NgFor],
  templateUrl: 'marketplace.component.html'
})
export class MarketplaceComponent {
  products: any[] = [];


  constructor( private productService: ProductService ) {

  }
 
}
