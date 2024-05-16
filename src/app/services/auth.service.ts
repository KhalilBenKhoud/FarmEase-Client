import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   headers = new HttpHeaders({
    'Content-Type': 'application/json'   
  });

   

  constructor(private http : HttpClient) { }
  
   isLoggedOut :boolean = true ;
  
   isAuthenticated() {
    return !!localStorage.getItem('accessToken') && this.isLoggedOut == false;
  }

  login(requestBody : {email : string , password : string}) {
    return this.http.post(`${environment.BaseApiUrl}/auth/authenticate`,requestBody,{ headers : this.headers , withCredentials: true  })
  }

  refreshToken() {
    return this.http.get(`${environment.BaseApiUrl}/auth/refresh_token`,{ headers : this.headers , withCredentials: true  })
  }

  logout() {
    
    return this.http.post(`${environment.BaseApiUrl}/auth/logout`,{ headers : this.headers , withCredentials: true  }) 
  }

  register(requestBody :any) {
    return this.http.post(`${environment.BaseApiUrl}/auth/register`,requestBody,{ headers : this.headers , withCredentials: true  })
  }

  requestForgetPasswordCode(email : string) {
    return this.http.post(`${environment.BaseApiUrl}/auth/forget-password`,email,{ headers : this.headers , withCredentials: true  })

  }

  verifyForgetPasswordCode(code : string) {
    return this.http.post(`${environment.BaseApiUrl}/auth/verify-forget-token`,code,{ headers : this.headers , withCredentials: true  })

  }

  resetPassword(reset : {token : string, newPassword : string }) {
    return this.http.post(`${environment.BaseApiUrl}/auth/reset-password`,reset,{ headers : this.headers , withCredentials: true  })

  }


}
