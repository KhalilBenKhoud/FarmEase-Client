import { Component, OnInit, HostListener, OnChanges, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product } from '../core/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
  isScrolled: boolean = false; // Flag to track scroll state
  sidebarVisible: boolean = false;
  constructor( public authService : AuthService, private router: Router, private cartService: CartService) {}
  totalCartPrice: number = 0;
  cartItems: any[] = [];
  cartDetails: any[] = [];
  
  
showInsuranceDropdown : boolean = false ;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollY = window.scrollY; // Get current scroll position
    this.isScrolled = scrollY > 5; // Update flag based on scroll position
  }

  ngOnInit() {
    this.onScroll(); // Call onScroll initially to set state on component load
    this.retrieveCartDetails();
  }
////////mena
dragStart(event: DragEvent, item: any): void {
  console.log('Drag Start:', item);
  event.dataTransfer?.setData('text/plain', JSON.stringify(item.productid));
}

dragEnd(): void {
  console.log('Drag End');
}

allowDrop(event: DragEvent): void {
  event.preventDefault();
}

drop(event: DragEvent): void {
  event.preventDefault();
  const productId = event.dataTransfer?.getData('text/plain');
  if (productId) {
    const productIdNumber = parseInt(productId, 10);
    this.remove(productIdNumber);
    this.retrieveCartDetails();
    this.retrieveTotalCartPrice();

  }

  
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


updateCart(): void {
  this.retrieveCartDetails();
  this.retrieveTotalCartPrice();
}  


remove(productid: number): void {
  console.log('Remove Product ID:', productid);
  this.cartService.removeFromCart(productid).subscribe(
    () => {
      console.log('Produit supprimé du panier avec succès.');
      // Mettez à jour votre liste de produits ici si nécessaire
    },
    error => {
      console.error('Erreur lors de la suppression du produit du panier:', error);
      // Gérer l'erreur ici si nécessaire
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





removeFromCart(productId: number): void {
  this.cartService.removeFromCart(productId).subscribe(
    () => {
      console.log('Produit supprimé du panier avec succès.');
      // Ajoutez ici la logique pour mettre à jour la liste de produits dans le panier ou le message de succès si nécessaire
    },
    error => {
      console.error('Erreur lors de la suppression du produit du panier:', error);
      // Ajoutez ici la logique pour gérer l'erreur si nécessaire
    }
  );
}
//////lena 
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

  logout() {
    this.authService.logout().subscribe(
      (data : any) => { localStorage.removeItem('accessToken') ; this.authService.isLoggedOut = true ;
      this.router.navigate(["/home"])},
      error => {  console.log(error) ;}
    )
  }
  openCartSidebar(): void {
    // Affichez le sidebar du panier en mettant à jour une variable de contrôle
    this.sidebarVisible = true;
    this.retrieveCartDetails();
    this.retrieveTotalCartPrice();
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

  
}
