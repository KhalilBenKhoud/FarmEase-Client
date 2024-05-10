import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../core/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }
  addProduct(formData: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
  
    return this.httpClient.post(`${environment.BaseApiUrl}/product/addProduct`, formData, { headers });
  }


  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${environment.BaseApiUrl}/product/allProduct`);
  }
  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${environment.BaseApiUrl}/product/getProductById/${id}`);
  }
  findProductsInPriceRange(minPrice: number, maxPrice: number): Observable<Product[]> {
    const url = `${environment.BaseApiUrl}/product/products/price/${minPrice}/${maxPrice}`;
    return this.httpClient.get<Product[]>(url);
  }

  getProductsByName(name: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.BaseApiUrl}/product/${name}`);
  }
  
  toggleLikePack(productId: number): Observable<Product> {
    return this.httpClient.post<Product>(`${environment.BaseApiUrl}/product/addLike/${productId}`,{});
  }

  trierProduitsParPrix(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`$(environment.BaseApiUrl)/product/produits/trier/prix`);
  }
  getMostLikedProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.BaseApiUrl}/product/most-liked`);
  }
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.BaseApiUrl}/product/products/${category}`);
  }
  removeProduct(productId: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.BaseApiUrl}/product/deleteProductById/${productId}`);
  }
  editProduct(productId: number, updatedProduct: Product): Observable<Product> {
    
    return this.httpClient.put<Product>(`${environment.BaseApiUrl}/product/edit/${productId}`, updatedProduct);
  }

    
  getProductLikes(): Observable<any> {
    return this.httpClient.get<any>(`${environment.BaseApiUrl}/product/productLikes`);
  }

}   
