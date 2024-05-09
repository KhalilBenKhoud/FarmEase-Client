import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http : HttpClient) { }
  
  getAll() {
    return this.http.get(`${environment.BaseApiUrl}/admin/user/all`) ;
  }

  sortByBalance() {
    return this.http.get(`${environment.BaseApiUrl}/admin/user/sortedByMoney`) ;
  }

  sortByRegistrationDate() {
    return this.http.get(`${environment.BaseApiUrl}/admin/user/sortedByDate`) ;
  }

  banUser(id : number) {
    return this.http.post(`${environment.BaseApiUrl}/admin/user/ban/${id}`,null) ;
  }
  permitUser(id : number) {
    return this.http.post(`${environment.BaseApiUrl}/admin/user/permit/${id}`,null) ;
  }
  wealthDistributionIndex() {
    return this.http.get(`${environment.BaseApiUrl}/admin/user/wealthDistributionIndex`) ;
  }

}
