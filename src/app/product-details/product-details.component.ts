import { Component, OnInit } from '@angular/core';
import { Product } from '../core/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | null = null;
  quantity: number = 1;

  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.getProductDetails(id);
    }
  }

  getProductDetails(id: number): void {
    this.productService.getProductById(id)
      .subscribe((product: Product | null) => {
        this.product = product;
      }, error => {
        console.error('Error fetching product details:', error);
      });
  }

  getImageUrl(imageFile: string): string {
    return `http://localhost:1500/image/${imageFile}`; // Modify if image path differs
  }

  addToCart() {
    if (this.quantity > 0 && this.product) {
     
      this.cartService.addToCart(this.product.productId, this.quantity)
        .subscribe(
          //response => {
         // console.log("hhh"); // Handle success or error response
          // Handle successful addition to cart (e.g., display success message)
        // }
        //, error => {
        //   console.error('Error adding to cart:', error);
        //   // Handle cart addition errors
        // }
      );
    } else {
     // console.error('Invalid quantity or product is null');
    }
  }
}
