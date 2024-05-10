import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileServiceService } from 'src/app/services/profile-service.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
   @Input() visible: boolean = false;
   @Input() profile : any = {} ;
   @Input() profileImage : string = '' ;
   @Output() closed = new EventEmitter<void>();

   constructor(private profileService : ProfileServiceService) {}

   stateOptions: any[] = [{ label: 'farmer', value: 'FARMER' },{ label: 'fisher', value: 'FISHER' }];

    value !: string   ;

    newFirstname !: string ;

    newLastName !: string ;
    newEmail !: string ;

    ngOnInit() {
      this.value = this.profile.role ;
      this.newFirstname = this.profile.firstname ;
      this.newLastName = this.profile.lastname ;
      this.newEmail = this.profile.email ;
    }
 
   async  updateProfile() {
      this.profileService.updateProfile({
        firstname : this.newFirstname,
        lastname : this.newLastName,
        email : this.newEmail ,
        role : this.value
      }).subscribe(
          data => {console.log(data) ; },
          error => console.log(error) 
      )
    }
  
    

   closeModal() {
     this.visible = false;
     this.closed.emit(); // Emit an event when closed
   }
 
}
