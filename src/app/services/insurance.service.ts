import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Insurance } from '../entities/User';


@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private http: HttpClient) { }

  addInsurance(data: any): Observable<any> {
    console.log(data);
    
    return this.http.post<any>(`${environment.BaseApiUrl}/insurances/add`, data);

}


getAllInsurances(): Observable<Insurance[]> {
  return this.http.get<Insurance[]>(`${environment.BaseApiUrl}/insurances/getAll`);
}

}
