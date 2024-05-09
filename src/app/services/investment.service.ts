import { Injectable } from '@angular/core';
import { Investment } from '../models/Investment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {
  readonly baseUrl = 'http://localhost:8080/api/v1/investments';

  constructor(private http: HttpClient) {}

  createInvestment(investment: Investment, projectId: number): Observable<Investment> {
    return this.http.post<Investment>(`${this.baseUrl}/${projectId}`, investment);
  }
  

  getInvestmentById(id: number): Observable<Investment> {
    return this.http.get<Investment>(`${this.baseUrl}/${id}`);
  }

  getAllInvestments(): Observable<Investment[]> {
    return this.http.get<Investment[]>(this.baseUrl);
  }

  getInvestmentsByProject(projectId: number): Observable<Investment[]> {
    return this.http.get<Investment[]>(`${this.baseUrl}/project/${projectId}`);
  }

  getInvestmentsByInvestor(investorId: number): Observable<Investment[]> {
    return this.http.get<Investment[]>(`${this.baseUrl}/investor/${investorId}`);
  }

  updateInvestment(investment: Investment): Observable<Investment> {
    return this.http.put<Investment>(`${this.baseUrl}/${investment.id}`, investment);
  }

  deleteInvestment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
