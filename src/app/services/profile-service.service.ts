import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

 

  constructor(private http: HttpClient) { }
  
    //headers = new HttpHeaders({ 'responseType': 'blob' }); 

    getProfile() {
     
      return this.http.get(`${environment.BaseApiUrl}/user/current`) ;
    }
    
    updateProfile(newProfile : any) {
      return this.http.put(`${environment.BaseApiUrl}/user/current`,newProfile) ;
    }

    getProfileImage(time : number) {
      return this.http.get(`${environment.BaseApiUrl}/user/current/image`) ;
    }

    addProfileImage(image : any) {
      //const headers = new HttpHeaders({'Content-Type': 'multipart/form-data'})
      return this.http.put(`${environment.BaseApiUrl}/user/current/image`,image) ;
    }

}
