import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoanType } from "../Models/LoanType";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

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
  

}