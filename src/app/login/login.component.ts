import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers :  [MessageService]
})
export class LoginComponent {
   email : string = '';
   password : string = '' ;
   emptyFieldWarning  :  Message[]  = [{ severity: 'warn', summary: '', detail: 'should not be empty !' }];
   emailEmpty : boolean = false ;
   passwordEmpty : boolean = false ;
   
   constructor(private auth : AuthService , private router: Router , private messageService: MessageService) {}
  

   

   showError(error : string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
   }

   onSubmit() {
     if(this.email == '') { this.emailEmpty = true ; return ; }
     if(this.password == '') {this.passwordEmpty = true ; return ; }
    this.auth.login({email : this.email, password : this.password}).subscribe(
      (data :any) => { console.log(data) ;
      localStorage.setItem('accessToken', data.access_token);
      if(this.email == 'khalil@farmEase.com') {
        this.router.navigate(['/dashboard']);
      }
      else
      this.router.navigate(['/profile']);
     
      },
      error => {console.log(error) ; this.showError(error.error.message)}
     )
   }
}
