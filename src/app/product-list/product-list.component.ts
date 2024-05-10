import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../core/product';
import { CartService } from '../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
declare var tmImage: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers :  [MessageService]
})
export class ProductListComponent implements OnInit {
  visible: boolean = false;
  selectedProduct: any;
  displayDialog: boolean = false;
  product: Product | null = null;
  selectedCategory: string = '';
  products: Product[] = [];
  URL = "https://teachablemachine.withgoogle.com/models/p7_tB_GcX/";
  model: any;
  labelContainer: any;
  maxPredictions: number = 0;
  searchQuery: string = '';
  uploadedImage: any = null;
  checked: boolean = false;
  productNameSearch: string = '';
  filteredProducts$: Observable<any[]> | undefined;
  sortOrder: string = 'all'; // Initialisation du choix de tri par défaut
  sortedProducts: Product[] = []; // Tableau pour stocker les produits triés
  mostLikedProducts: Product[] = [];


//////////////////////
responsiveOptions: any[] | undefined;
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: CartService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
    this.getProducts(); // Appel initial pour obtenir les produits

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.getProductDetails(id);
    }
    this.productService.getMostLikedProducts().subscribe(products => {
      this.mostLikedProducts = products;
    });
    
  }

  filterProductsByName() {
    this.filteredProducts$ = this.productService.getProductsByName(this.productNameSearch);
  }

 getProducts() {
  this.productService.getAllProducts().subscribe(products => {
    if (products) {
      this.products = products;
        this.loadModel();
      this.sortProducts(); // Appel du tri initial après avoir reçu les produits
    
    } else {
      console.error("Aucun produit récupéré.");
    }
  }, error => {
    console.error("Erreur lors de la récupération des produits:", error);
  });
}

  filterProductsByCategory() {
    // Filter products by category if selected, otherwise fetch all products
    if (this.selectedCategory) {
      this.productService.getProductsByCategory(this.selectedCategory).subscribe(
        products => {
          this.products = products;
          this.sortProducts(); // Sort products after filtering
        },
        error => {
          console.error('Error fetching products by category:', error);
        }
      );
    } else {
      this.getProducts(); // Fetch all products if no category is selected
    }
  }
  
  sortProducts() {
    if (this.sortOrder === 'priceAsc') {
      // Tri par prix croissant
      this.sortedProducts = this.products.slice().sort((a, b) => a.productPrice - b.productPrice);
    } else if (this.sortOrder === 'priceDesc') {
      // Tri par prix décroissant
      this.sortedProducts = this.products.slice().sort((a, b) => b.productPrice - a.productPrice);
    } else if (this.sortOrder === 'like') {
      // Tri par like
      this.sortedProducts = this.mostLikedProducts.slice();
    } else  {
      // Tri par défaut (par exemple, tri par Like)
      this.sortedProducts = this.products.slice();
    }
  }


  loadMostLikedProducts() {
    this.productService.getMostLikedProducts().subscribe(
      products => {
        this.mostLikedProducts = products;
        this.sortProducts(); // Tri des produits les plus aimés
      },
      error => {
        console.error('Error fetching most liked products:', error);
      }
    );
  }

  showDialog(product: Product) {
    this.selectedProduct = product; // Mettre à jour le produit sélectionné
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }

  getImageUrl(imageFile: string): string {
    return `http://localhost:1500/image/${imageFile}`;
  }

  addToCartWithDefaultQuantity(productId: number): void {
    const defaultQuantity = 1;
    this.cartService.addToCart(productId, defaultQuantity).subscribe(
      (response) => {
        this.showSuccessToast();
        
        console.log('Product added to cart successfully:', response);
      },
      (error) => {
        this.showSuccessToast();
       
       console.error('Error adding product to cart:', error);
      }
    );
    
  }

  async loadModel() {
    const modelURL = this.URL + "model.json";
    const metadataURL = this.URL + "metadata.json";

    try {
      this.model = await tmImage.load(modelURL, metadataURL);
      this.maxPredictions = this.model.getTotalClasses();
    } catch (error) {
      console.error("Erreur lors du chargement du modèle:", error);
    }

    this.labelContainer = document.getElementById("label-container");

    for (let i = 0; i < this.maxPredictions; i++) {
      if (this.labelContainer) {
        this.labelContainer.appendChild(document.createElement("div"));
      }
    }
  }

  async predict(input: any) {
    if (this.model && input) {
      try {
        const prediction = await this.model.predict(input);
        this.displayPredictions(prediction);
        this.processPrediction(prediction);
      } catch (error) {
        console.error("Erreur lors de la prédiction:", error);
      }
    }
  }

  displayPredictions(prediction: any) {
    if (this.labelContainer) {
      for (let i = 0; i < this.maxPredictions; i++) {
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        if (this.labelContainer.childNodes[i]) {
          this.labelContainer.childNodes[i].innerHTML = classPrediction;
        }
      }
    }
  }

  handleImageUpload(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const img = new Image();
        img.onload = () => {
          this.uploadedImage = img;
          this.predict(this.uploadedImage);
        };
        img.onerror = () => {
          console.error("Erreur lors du chargement de l'image");
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  openImageUpload() {
    const input = document.getElementById("imageUpload") as HTMLInputElement;
    if (input) {
      input.click();
    }
  }

  processPrediction(prediction: any) {
    const threshold = 0.5;
    let searchQuery = null;
    for (let i = 0; i < this.maxPredictions; i++) {
      if (prediction[i].probability > threshold) {
        searchQuery = prediction[i].className;
        break;
      }
    }
    if (searchQuery) {
      this.searchQuery = searchQuery;
      this.performSearch(searchQuery);
    }
  }

  performSearch(searchQuery: string) {
    console.log("Recherche des produits avec la classe :", searchQuery);
    this.updateProductDisplay(searchQuery);
  }

  updateProductDisplay(name: string) {
    this.productService.getProductsByName(name).subscribe(
      products => {
        console.log("Produits correspondants :", products);
        this.products = products;
      },
      error => {
        console.error("Erreur lors de la récupération des produits:", error);
      }
    );
  }

  toggleLike(productId: number): void {
    this.productService.toggleLikePack(productId).subscribe(
      updatedProduct => {
        const index = this.products.findIndex(p => p.productId === updatedProduct.productId);
        if (index !== -1) {
          this.products[index] = updatedProduct;
          this.showSuccess();
        }
      },
      error => {
        console.error('Error toggling like:', error);
        this.showSuccess();
      }
    );
  }

  getProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe(
      (product: Product | null) => {
        this.product = product;
      },
      error => {
        console.error('Error fetching product details:', error);
      }
    );
  }



  quantity: number = 1;
  addToCart(): void {
    if (this.quantity > 0 && this.selectedProduct) {
        this.cartService.addToCart(this.selectedProduct.productId, this.quantity).subscribe(
            () => {
              this.showSuccessToast();
              
                console.log('Product added to cart successfully');
               
                this.hideDialog(); // Cacher le dialogue après l'ajout au panier réussi
            },
            error => {
              this.showSuccessToast();
                console.error('Error adding product to cart:', error);
            }
        );
    } else {
        console.error('Invalid quantity or product.');
    }

}

showSuccessToast() {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully' });
  }
  
  showErrorToast() {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occurred while adding the product' });
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'like added successfully' });
    }
    
    showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occurred while add like to product' });
    }

}
