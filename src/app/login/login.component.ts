import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   email : string = '';
   password : string = '' ;
   
   
   constructor(private auth : AuthService , private router: Router) {}

  
   onSubmit() {
     this.auth.login({email : this.email, password : this.password}).subscribe(
      (data :any) => { console.log(data) ;
      localStorage.setItem('accessToken', data.access_token);
      this.router.navigate(['/profile']);
     
      },
      error => {console.log(error) ; alert(error.error.message)}
     )
   }
}
