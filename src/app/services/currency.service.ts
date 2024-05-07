import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private baseUrl = 'http://localhost:8080'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Observable<string> {
    const url = `${this.baseUrl}/convert`;
    const params = new HttpParams()
      .set('amount', amount.toString())
      .set('fromCurrency', fromCurrency)
      .set('toCurrency', toCurrency);

    return this.http.get<string>(url, { params });
  }
}
