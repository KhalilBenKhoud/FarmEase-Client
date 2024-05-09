import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Insurance } from '../entities/User';
import { Sinister } from '../model/Sinister';


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
deleteSinister(id: number): Observable<void> {
  return this.http.delete<void>(`${environment.BaseApiUrl}/sinisters/${id}`);
}
updateSinister(id: number, sinister: Sinister): Observable<Sinister> {
  return this.http.put<Sinister>(`${environment.BaseApiUrl}/sinisters/${id}`, sinister);
}

getSinistersByInsurance(id : number) {
    return this.http.get<any[]>(`${environment.BaseApiUrl}/sinisters/byInsurance/${id}`);

  }

  countSinistersByLocation(){
    return this.http.get(`${environment.BaseApiUrl}/sinisters/findAllSinisterCoordinates`);
  }
  
  getAllSinisters(): Observable<Sinister[]> {
    return this.http.get<Sinister[]>(`${environment.BaseApiUrl}/sinisters`);
  }

}
