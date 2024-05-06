import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MortgageService {

  constructor(private http: HttpClient) { }

  getAllMortgages(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.BaseApiUrl}/mortgages/get`);
  }

  getMortgageById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.BaseApiUrl}/mortgages/get/${id}`);
  }

  addMortgage(mortgageData: any): Observable<any> {
    return this.http.post(`${environment.BaseApiUrl}/mortgages/add`, mortgageData);
  }

  updateMortgage(id: number, mortgageData: any): Observable<any> {
    return this.http.put(`${environment.BaseApiUrl}/mortgages/update/${id}`, mortgageData);
  }

  deleteMortgage(id: number): Observable<any> {
    return this.http.delete(`${environment.BaseApiUrl}/mortgages/delete/${id}`);
  }
}
