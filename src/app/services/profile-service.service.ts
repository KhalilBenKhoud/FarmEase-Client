import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../entities/User';



@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

 

  constructor(private http: HttpClient) { }

    getProfile() {
     
      return this.http.get(`${environment.BaseApiUrl}/user/current`) ;
    }

    getCurrentUser(): Observable<User> {
      return this.http.get<User>(`${environment.BaseApiUrl}/user/current`);
    }
}
