import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProfileServiceService } from '../services/profile-service.service'; // Import du service de profil
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  cartDetails: any[] = [];
  totalCartPrice: number = 0;
  numberOfMonths!: number ;
  downPayment!: number ;
  cartId: number = 0; // Ajout de la variable cartId
  monthlyPrices: any[] = [];
  couponCode: string = '';

  constructor(private cartService: CartService, private profileService: ProfileServiceService) { }

  ngOnInit(): void {
    this.updateCart();
    this.getCartId(); // Appel de la fonction pour récupérer cartId
  }

  retrieveCartDetails(): void {
    this.cartService.retrieveCart().subscribe(
      (data) => {
        this.cartDetails = data;
        console.log('Cart Details:', this.cartDetails);
      },
      (error) => {
        console.error('Error fetching cart details:', error);
      }
    );
  }

  getImageUrl(imageFile: string): string {
    return `http://localhost:1500/image/${imageFile}`;
  }

  retrieveTotalCartPrice(): void {
    this.cartService.getTotalCartPrice().subscribe(
      (price) => {
        this.totalCartPrice = price;
        console.log('Total Cart Price:', this.totalCartPrice);
      },
      (error) => {
        console.error('Error fetching total cart price:', error);
      }
    );
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.updateCart();
    }, error => {
      console.error('Error removing item from cart:', error);
    });
  }

  getCartId(): void {
    this.profileService.getProfile().subscribe(
      (profileData: any) => {
        this.cartId = profileData.cartId;
        console.log('Cart ID:', this.cartId);
      },
      (error) => {
        console.error('Error fetching cart ID:', error);
      }
    );
  }

  calculateMonthlyPrices(): void {
    // Appel de la méthode de service pour calculer les prix mensuels
    this.cartService.calculateMonthlyPrices(this.numberOfMonths, this.downPayment)
      .subscribe((prices: number[]) => {
        this.monthlyPrices = []; // Réinitialisez le tableau avant de l'utiliser
        for (let i = 0; i < prices.length; i++) {
          const result = `Mois ${i + 1}: ${prices[i]} TND`;
          this.monthlyPrices.push(result); // Ajoutez chaque résultat au tableau monthlyPrices
        }
        console.log('Monthly Prices:', this.monthlyPrices); // Ceci est facultatif, vous pouvez le supprimer si vous ne voulez pas l'afficher dans la console
      }, error => {
        console.error('Error calculating monthly prices:', error);
        this.monthlyPrices = ['Error calculating monthly prices']; // En cas d'erreur, ajoutez un message d'erreur au tableau monthlyPrices
      });
  } 
  applyCoupon(): void {
    if (!this.couponCode) {
      alert('Please enter a coupon code.');
      return;
    }

    this.cartService.applyCoupon(this.couponCode).subscribe(
      (response) => {
        alert(response); // Affichez la réponse complète de l'API
        // Mettez à jour les détails du panier si nécessaire
      },
      (error) => {
        console.error('Failed to apply coupon:', error);
        alert('Failed to apply coupon: ' + error.error); // Affichez le message d'erreur complet de l'API
      }
    );
  } 
  updateCart(): void {
    this.retrieveCartDetails();
    this.retrieveTotalCartPrice();
  }   
  confirmPurchase(): void {
    this.cartService.confirmPurchase().subscribe(
      (response) => {
        console.log('Purchase confirmed successfully:', response);
        this.clearCart();
   
        this.updateCart();
        // Ajoutez ici la logique pour gérer la réponse après la confirmation d'achat
      },
      (error) => {
        console.error('Failed to confirm purchase:', error);
        this.clearCart();
        this.updateCart();
        // Ajoutez ici la logique pour gérer les erreurs lors de la confirmation d'achat
      }
    );
  }
  clearCart(): void {
    this.cartService.clearCart().subscribe(
      (response: string) => {
       
        console.log('Cart cleared successfully');
      },
      (error) => {
      
        console.error('Error clearing cart:', error);
      }
    );
  }
}
