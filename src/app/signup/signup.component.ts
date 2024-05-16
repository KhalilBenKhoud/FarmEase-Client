import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers :  [MessageService]
})
export class SignupComponent {
      firstname !: string ;
      lastname !: string ;
      email !: string ;
      role !: string ;
      password !: string ;
      repeatPassword !: string ;
      agree : boolean = false  ;
      stateOptions: any[] = [{ label: 'farmer', value: 'FARMER' },{ label: 'fisher', value: 'FISHER' }];


    
     constructor(private auth : AuthService, private router :Router,  private messageService: MessageService) {}
    
     showWarn(warning : string) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: warning });
     }

     showError(error : string) {
      this.messageService.add({ severity: 'error', summary: 'Warning', detail: error });
     }
  
   showSuccess(message : string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });

   }

      onSubmit() {
        if(!this.firstname || !this.lastname  || !this.email || !this.password || !this.role) {
           this.showWarn("fill all the fields !") ;
           return ;
        }
        if(this.password != this.repeatPassword) { this.showWarn("mismatching passwords !") ; return ; }
        if(!this.agree) {this.showWarn("you have to agree to our terms !") ; return ; }  
        const requestBody = {
         firstname : this.firstname,
         lastname : this.lastname ,
         email : this.email ,
         role : this.role ,
         password : this.password 
        }
        console.log(requestBody)
        this.auth.register(requestBody).subscribe(
          (data : any) => {this.showSuccess(data.message) ; this.router.navigate(['/login'])},
          error => this.showError("there was a problem signing you up, probably your email is not real")
        )
      }

}
