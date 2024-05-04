import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../services/profile-service.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private profileService : ProfileServiceService, private auth : AuthService) {}
  profile : any ;
  
  ngOnInit() {
    this.profileService.getProfile().subscribe(
      data => {this.profile = data ; console.log(data.constructor) ; },
      error => alert(error.error.message)
    )
  }
}
