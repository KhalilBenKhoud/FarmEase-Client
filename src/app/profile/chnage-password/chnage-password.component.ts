import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProfileServiceService } from 'src/app/services/profile-service.service';

@Component({
  selector: 'app-chnage-password',
  templateUrl: './chnage-password.component.html',
  styleUrls: ['./chnage-password.component.css'],
  providers :  [MessageService]
})
export class ChnagePasswordComponent {

  
  @Output() closed = new EventEmitter<void>();
  @Input() visible: boolean = false;
  @Input() profile : any = {} ;
  @Input() profileImage : string = '' ;

  
  inputType1 : string = 'password' ;
  inputType2 : string = 'password' ;
  inputType3 : string = 'password' ;

 
  newPassword !: string ;
  confirmNewPassword !: string ;

  constructor(private profileService : ProfileServiceService, private messageService: MessageService) {}
  

  

  passwordToPlain(concerned : string) {
   if(concerned == 'input1') {
    this.inputType1 = this.inputType1 == 'password' ? 'text' : 'password' ;
   }
   if(concerned == 'input2') {
    this.inputType2 = this.inputType2 == 'password' ? 'text' : 'password' ;
   }
   if(concerned == 'input3') {
    this.inputType3 = this.inputType3 == 'password' ? 'text' : 'password' ;
   }
  
  }

  closeModal() {
    this.visible = false;
    this.closed.emit(); // Emit an event when closed
  }

 

   showWarn1() {
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'enter a new password' });
   }

   showWarn2() {
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'mismatching new password, make sure to type it correctly in the confirm password field ' });
   }

   showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'password updated successfully' });
   }


  async  updatePassword() {
 
  
   if(!this.newPassword) {
    this.showWarn1() ;
    return ;
   }
   if(this.confirmNewPassword != this.newPassword) {
    this.showWarn2() ;
    return ;
   }
   
    this.profileService.updateProfile({
      password : this.newPassword
    }).subscribe(
        data => { this.showSuccess() ; setTimeout(() => {this.visible = false ; },1000)  },
        error => console.log(error) 
    )
  }

 

}
