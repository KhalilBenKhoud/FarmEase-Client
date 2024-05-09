import{ Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/core/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html'
  
})
export class MarketPlaceComponent implements OnInit, AfterViewInit{

  products: any[] = [];
  productForm: FormGroup = new FormGroup({});
  product: Product = new Product();

  @ViewChild('barChart') barChart!: ElementRef;
  productLikes: any = {};
  constructor( private productService: ProductService,private cartService:CartService,private messageService: MessageService ) {
    Chart.register(...registerables);
  }
  ngOnInit(): void {
    this.getAllProducts();
    this.productForm = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      productDescription: new FormControl('', [Validators.required]),
      productPrice: new FormControl(null, [Validators.required]),
      productStock: new FormControl(null, [Validators.required]),
      productCategory: new FormControl('FARMER'),
      productImage: new FormControl(null)
    });
    this.productService.getProductLikes().subscribe(data => {
      this.productLikes = data;
    });
  }
  ngAfterViewInit() {
    this.productService.getProductLikes().subscribe((data: any) => {
      this.productLikes = data;
      this.renderChart();
    });
  }
    renderChart() {
      const ctx = this.barChart.nativeElement.getContext('2d');
      const keys = Object.keys(this.productLikes);
      const values = keys.map(key => this.productLikes[key]);

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: keys,
          datasets: [{
            label: 'Likes par Produit',
            data: values,
            backgroundColor: 'RGB(107, 191, 160)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  getImageUrl(imageFile: string): string {
    return `http://localhost:1500/image/${imageFile}`;
  }
  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getStatusText(stock: number): string {
    if (stock === 0) {
        return 'Out of Stock';
    } else if (stock > 0 && stock < 10) {
        return 'Low Stock';
    } else {
        return 'In Stock';
    }
}

 ///////////////
 
 ajouter(): void {
  if (this.productForm.valid) {
    const formData = new FormData();
    formData.append('productName', this.productForm.value.productName);
    formData.append('productDescription', this.productForm.value.productDescription);
    formData.append('productPrice', this.productForm.value.productPrice.toString());
    formData.append('productStock', this.productForm.value.productStock.toString());
    formData.append('productCategory', this.productForm.value.productCategory);
    formData.append('imageFile', this.productForm.value.productImage);
    
    this.productService.addProduct(formData)
.subscribe(
  (response) => {
    this.showSuccessToast(); // Afficher le message de succès si l'ajout est réussi
    this.getAllProducts(); // Recharger la liste des produits après l'ajout
    this.hideDialog(); // Cacher le dialogue d'ajout de produit
  },
  (error) => {
    this.showSuccessToast(); // Afficher le message d'erreur si l'ajout échoue
  }
);
}}

showSuccessToast() {
this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully' });
}

showErrorToast() {
this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occurred while adding the product' });
}
onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement)?.files?.[0];
  if (file) {
    this.productForm.patchValue({ productImage: file });
    this.productForm.get('productImage')!.updateValueAndValidity();
  }
}

onFileSelected(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (inputElement.files && inputElement.files.length > 0) {
    this.product.productImage = inputElement.files[0].name;
  }
}
displayDialog: boolean = false;
showDialog() {
  this.productForm.reset();
  this.displayDialog = true;
}
hideDialog() {
  this.displayDialog = false;
}

removeFromCart(productId: number): void {
  this.productService.removeProduct(productId).subscribe(() => {
    this.getAllProducts();
  }, error => {
    console.error('Error removing product:', error);
  });
}

editProduct(): void {
  // if (this.productForm.valid) {
  //   // Assuming you have a productId field in your form, if not, adjust accordingly
  //   this.productService.ditProduct(this.productForm.value).subscribe(
  //     (updatedProduct: Product) => {
  //       console.log('Product updated:', updatedProduct);
  //       this.productForm.reset();
  //       this.displayDialog = false;
  //       this.getAllProducts(); // Refresh the product list after successful update
  //     },
  //     (error: any) => {
  //       console.error('Error updating product:', error);
  //     }
  //   );
  // }
}

openEditDialog(product: Product) {
  // Pré-remplir le formulaire de modification avec les détails du produit sélectionné
  this.productForm.patchValue({
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productStock: product.productStock,
      productCategory: product.productCategory,
      // Assurez-vous d'avoir un champ productId dans votre formulaire s'il est nécessaire pour l'édition
  });
  
  // Ouvrir la modal de modification
  this.displayDialog = true;
}


}
