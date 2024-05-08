import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../services/profile-service.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private profileService : ProfileServiceService, private auth : AuthService, private router : Router) {}
  profile !: any ;
  profileImage : string = "" ;
  selectedFile !: File ;
  imageInput !: any ;
  showEdit : boolean = false ;
  showChangePassword : boolean = false ;
  ngOnInit() {
   
    setInterval(() => {
      if(this.auth.isAuthenticated())
      this.fetchProfile()
    },5000)
  
    this.getProfileImage()
  }
 
  showmodal() {
    this.showEdit = true ;
    
  }

  showPasswordModal() {
    this.showChangePassword = true;
  }

    closeModal() {
    this.showEdit = false ; 
    setTimeout(() => {
      this.fetchProfile() ;
    },500) 
  }

  closePasswordModal() {
    this.showChangePassword = false ; 
    setTimeout(() => {
      this.fetchProfile() ;
    },500) 
  }


  fetchProfile() {
    this.profileService.getProfile().
    subscribe(
      data => {this.profile = data ; console.log("fetched : "+JSON.stringify(data)) ; },
      error => alert(error.error.message)
    )
  }


  changeImage(event : any) {
    this.selectedFile =  event.target.files[0] ;
    const formData = new FormData();
    formData.append('imageFile', this.selectedFile);

    this.addProfileImage(formData) ;
  }

   createImageFromBlob(imageBlob: any): string {
    const reader = new FileReader();
    reader.readAsDataURL(new Blob([imageBlob]));
    return reader.result as string; // Return the Base64-encoded image URL
  }

   addProfileImage( image : any) {
     this.profileService.addProfileImage(image).subscribe(
       (data) => {
          console.log(data) ;
          this.getProfileImage() ;
          this.imageInput = null ;
      },
      (error) => {console.log(error)}
     )
   }

    getProfileImage() {
    const timestamp = new Date().getTime(); // Generate a timestamp
    this.profileService.getProfileImage(timestamp).subscribe(
      (data : any) => {
        console.log(data) ;
        const base64ImageData = `data:image/jpeg;base64,${data.image}`; // Assuming response is Base64 string
        this.profileImage = base64ImageData ;
      
      },
      (error) => {console.log(error)}
    )
   }

}
