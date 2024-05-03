import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders, HttpResponse  } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Amorrtissement } from '../Models/Amorrtissement';
import { Credit } from '../Models/Credit.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditService {
 
  private simulateUrl = `${environment.BaseApiUrl}/simulate`; // Définir l'URL de l'endpoint simulate

  constructor(private httpClient: HttpClient) { }

  createCredit(credit: Credit): Observable<Object> {
    return this.httpClient.post(`${environment.BaseApiUrl}/credit`, credit);
  }

  getCredits(): Observable<Credit[]> {
    return this.httpClient.get<Credit[]>(`${environment.BaseApiUrl}/credit`);
  }

  simulate(mnttotl: number, period: number, interst: number): Observable<Amorrtissement> {
    // Construire les paramètres de la requête
    const params = new HttpParams()
      .set('mnttotl', mnttotl.toString())
      .set('period', period.toString())
      .set('interst', interst.toString());

    // Effectuer la requête GET vers l'API Spring
    return this.httpClient.get<Amorrtissement>(environment.BaseApiUrl, { params });
  }


  getAmortisementTable(idCredit: number): Observable< Amorrtissement[]> {
    return this.httpClient.get< Amorrtissement[]>(`${environment.BaseApiUrl}/getAmortisementTable/${idCredit}`);
  }

  exportToExcel(idCredit: number): Observable<HttpResponse<Blob>> {
    const url = `http://localhost:1005/api/v1/excel?idCredit=${idCredit}`;
    return this.httpClient.get(url, {
      responseType: 'blob',
      observe: 'response'
    });
  }


  updateCredit(credit: Credit, idCredit: number): Observable<Object> {
    return this.httpClient.put(`${environment.BaseApiUrl}/credit/${idCredit}`, credit)  
  }

  

  
}
