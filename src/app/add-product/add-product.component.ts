import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../core/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  productForm: FormGroup = new FormGroup({});
  product: Product = new Product();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      productDescription: new FormControl('', [Validators.required]),
      productPrice: new FormControl(null, [Validators.required]),
      productStock: new FormControl(null, [Validators.required]),
      productCategory: new FormControl('FARMER'),
      productImage: new FormControl(null)
    });
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.productForm.patchValue({ productImage: file });
      this.productForm.get('productImage')!.updateValueAndValidity();
    }
  }

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
    response => {
      if (response.status === 200) { // Assuming success status code is 200
        console.log('Produit ajouté avec succès');
        // Handle successful addition
      } else {
        console.error('Échec de lajout du produit:', response.text());
      }
    },
    error => {
      console.error('Échec de lajout du produit:', error);
    }
  );}
  }
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.product.productImage = inputElement.files[0].name;
    }
  }
  
}
