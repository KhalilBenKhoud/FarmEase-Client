import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartItems } from '../core/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getAllCartItems()  {
    return this.http.get<any[]>(`${environment.BaseApiUrl}/cart/cartitemsByUser`);
  }
  retrieveCart(): Observable<any> {
    return this.http.get<any>(`${environment.BaseApiUrl}/cart/cartDetail`);
  }
  getTotalCartPrice(): Observable<number> {
    return this.http.get<number>(`${environment.BaseApiUrl}/cart/totalPrice`);
  }
 
  addToCart(productId: number, quantity: number): Observable<any> {
    const payload = { productId, quantity };
    return this.http.post<any>(`${environment.BaseApiUrl}/cart/addProductToCart/${productId}/${quantity}`, {});
  }

  removeFromCart(productId: number): Observable<any> {
    return this.http.delete<any>(`${environment.BaseApiUrl}/cart/remove-product/${productId}`);
  }

  calculateMonthlyPrices( numberOfMonths: number, downPayment: number): Observable<number[]> {
    return this.http.get<number[]>(`${environment.BaseApiUrl}/cart/calculateMonthlyPrices/${numberOfMonths}/${downPayment}`);
  }
  applyCoupon(couponCode: string): Observable<any> {
    return this.http.post<any>(`${environment.BaseApiUrl}/cart/applyCoupon/${couponCode}`, {});
  }
  confirmPurchase(): Observable<any> {
    return this.http.post<any>(`${environment.BaseApiUrl}/cart/confirm`, {});
  }
  public cartItemsSubject: BehaviorSubject<CartItems[]> = new BehaviorSubject<CartItems[]>([]);

  clearCart(): Observable<any> {

    return this.http.post<any>(`${environment.BaseApiUrl}/cart/clear`,{});
  }

}
