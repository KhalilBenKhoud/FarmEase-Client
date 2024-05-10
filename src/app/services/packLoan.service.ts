import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { LoanType } from "../Models/LoanType";
@Injectable({
  providedIn: 'root'
})
export class packLoanService {
  
  constructor(private httpClient: HttpClient) { }

  getLoanTypes(): Observable<LoanType[]> {
    const url = `${environment.BaseApiUrl}/LoanType`;
    return this.httpClient.get<LoanType[]>(url);
  }

  removeLoanType(loanTypeId: number): Observable<void> {
    const url = `${environment.BaseApiUrl}/LoanType/${loanTypeId}`;
    return this.httpClient.delete<void>(url);
  }
  
  updateLoanType(loanType_id: number, loanType: any): Observable<any> {
    return this.httpClient.put(`${environment.BaseApiUrl}/LoanType/${loanType_id}`, loanType).pipe(
      catchError((error: any) => {
        throw error;
      })
    );
  }

  addLoanType(loanType: LoanType, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('loanType', JSON.stringify(loanType)); // Convertissez le LoanType en chaîne JSON
    formData.append('image', image, image.name); // Ajoutez l'image

    const headers = new HttpHeaders(); // Pas besoin de Content-Type, il sera automatiquement défini par FormData

    return this.httpClient.post<any>(`${environment.BaseApiUrl}/LoanType`, formData, { headers: headers })
      .pipe(
        catchError(error => {
          console.error('Error adding loan type:', error);
          return throwError(error);
        })
      );
  }
}
