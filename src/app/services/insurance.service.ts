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

  addInsurance(data: any, duration : number): Observable<any> {
    console.log(data);
    
    return this.http.post<any>(`${environment.BaseApiUrl}/insurances/add/${duration}`, data);

}

getCurrentInsurances(): Observable<Insurance[]> {
  return this.http.get<Insurance[]>(`${environment.BaseApiUrl}/insurances/insurancesByUser`);
}


getAllInsurances(): Observable<Insurance[]> {
  return this.http.get<Insurance[]>(`${environment.BaseApiUrl}/insurances/getAll`);
}

assignSinister(id : number, data : any) {
  return this.http.post<any>(`${environment.BaseApiUrl}/sinisters/add/${id}`, data);
  
}

getSinistersByInsurance(id : number) {
    return this.http.get<any[]>(`${environment.BaseApiUrl}/sinisters/byInsurance/${id}`);

  }


}
