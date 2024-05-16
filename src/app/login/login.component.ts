import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers :  [MessageService]
 
})
export class LoginComponent {
   email : string = '';
   password : string = '' ;

   emailEmpty : boolean = false ;
   passwordEmpty : boolean = false ;
   
   constructor(private auth : AuthService , private router: Router, private messageService : MessageService ) {}
  
   showError(error : string) {
    this.messageService.add({ severity: 'error', summary: 'Warning', detail: error });
   }
   


   onSubmit() {
     if(this.email == '') { this.emailEmpty = true ; return ; }
     if(this.password == '') {this.passwordEmpty = true ; return ; }
    this.auth.login({email : this.email, password : this.password}).subscribe(
      (data :any) => { console.log(data) ;
      localStorage.setItem('accessToken', data.access_token);   localStorage.setItem('loggedIn', 'yes');
      this.auth.isLoggedOut = false ;
      if(this.email == 'khalil@farmEase.com') {
        this.router.navigate(['/dashboard']);
      }
      else
      this.router.navigate(['/profile']);
     
      },
      error => {this.showError("invalid credentials")}
     )
   }
}
