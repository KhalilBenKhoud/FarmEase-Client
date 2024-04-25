import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
      firstname !: string ;
      lastname !: string ;
      email !: string ;
      role !: string ;
      password !: string ;
      repeatPassword !: string ;
      agree !: boolean ;
      
     constructor(private auth : AuthService, private router :Router) {}

      onSubmit() {
        if(this.password != this.repeatPassword) { alert('mismatching passwords') ; throw Error() ; } 
        const requestBody = {
         firstname : this.firstname,
         lastname : this.lastname ,
         email : this.email ,
         role : this.role ,
         password : this.password 
        }
        console.log(requestBody)
        this.auth.register(requestBody).subscribe(
          (data : any) => {alert(data.message) ; this.router.navigate(['/login'])},
          error => alert(error.error.message)
        )
      }

}
