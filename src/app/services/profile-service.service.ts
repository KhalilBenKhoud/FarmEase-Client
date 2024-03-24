import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

 

  constructor(private http: HttpClient) { }

    getProfile() {
     
      return this.http.get(`${environment.BaseApiUrl}/user/current`) ;
    }
}
