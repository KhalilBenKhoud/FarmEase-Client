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
  
    //headers = new HttpHeaders({ 'responseType': 'blob' }); 

    getProfile() {
     
      return this.http.get(`${environment.BaseApiUrl}/user/current`) ;
    }

    getCurrentUser(): Observable<User> {
      return this.http.get<User>(`${environment.BaseApiUrl}/user/current`);
    }
    
    updateProfile(newProfile : any) {
      return this.http.put(`${environment.BaseApiUrl}/user/current`,newProfile) ;
    }

    deleteAccount() {
      return this.http.delete(`${environment.BaseApiUrl}/user/current`) ;

    }

    getProfileImage(time : number) {
      return this.http.get(`${environment.BaseApiUrl}/user/current/image`) ;
    }

    addProfileImage(image : any) {
      //const headers = new HttpHeaders({'Content-Type': 'multipart/form-data'})
      return this.http.put(`${environment.BaseApiUrl}/user/current/image`,image) ;
    }

 

}
