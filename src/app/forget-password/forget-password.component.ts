import { Component } from '@angular/core';
import { ControlContainer, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  providers :  [MessageService]
})
export class ForgetPasswordComponent {
  
  showSecondStep : boolean = false ;
  showThirdStep : boolean = false ;

  email !: string ;
  code !: string ;
  newPassword !: string ;

  constructor(private auth : AuthService , private router: Router , private messageService: MessageService) {}
   
  showError(error : string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
   }
   showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'flied is empty !' });
   }
   showSuccess(message : string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
   }

   requestForgetCode() {
     if(!this.email) {
      this.showWarn() ;
      return ;
     }
      this.auth.requestForgetPasswordCode(this.email).subscribe(
        (data : any) => {this.showSuccess(data.message) ; this.showSecondStep = true ;},
        (error : any) => {this.showError(error.error.message) ;}
      )

   }

   verifyForgetCode() {
      if(!this.code) {
        this.showWarn() ;
        return ;
      }

      this.auth.verifyForgetPasswordCode(this.code).subscribe(
        (data : any) => {this.showSuccess(`hi ${data.firstname}, you can proceed to resetting your password`) ; this.showThirdStep = true ;},
        (error : any) => {this.showError(error.error.message) ;}
      )
   }

   resetPassword() {
    if(!this.newPassword) {
      this.showWarn() ;
      return ;
    }

    this.auth.resetPassword({ newPassword : this.newPassword, token : this.code}).subscribe(
      (data : any) => {this.showSuccess(data.message) ; setTimeout(()=> {this.router.navigate(["/login"])},1000) },
      (error : any) => {this.showError(error.error.message) ; console.log(this.code)}
    )
 }

}
