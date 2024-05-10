import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProfileServiceService } from '../services/profile-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = []; // Initialisez cartItems
  cartDetails: any[] = [];
  sidebarVisible: boolean = false;

  constructor(
    private cartService: CartService,
    private profileService: ProfileServiceService
  ) {}

  ngOnInit(): void {
    this.retrieveCartDetails();
  }

  retrieveCartDetails(): void {
    this.cartService.retrieveCart().subscribe(
      (data) => {
        this.cartDetails = data;
        this.cartItems = data.items; // Récupérez les articles de panier
        console.log('Cart Items:', this.cartItems);
      },
      (error) => {
        console.error('Error fetching cart details:', error);
      }
    );
  }

  openCartSidebar(): void {
    this.sidebarVisible = true;
  }
}
