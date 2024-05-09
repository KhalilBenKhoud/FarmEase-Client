import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  convertCurrency(amount: number, fromCurrency: string, toCurrency: string) {
    const url = `http://localhost:1005/convert`;
    const params = new HttpParams()
      .set('amount', amount.toString())
      .set('fromCurrency', fromCurrency)
      .set('toCurrency', toCurrency);

    return this.http.get(url, { params, responseType:'text' });
  }
}
