import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileServiceService } from '../services/profile-service.service';
import { AuthService } from '../services/auth.service';
import { User } from '../entities/User';
import { InsuranceService } from '../services/insurance.service';
@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent {
  insuranceForm!: FormGroup;


  profile !: User  ;

  constructor(private formBuilder: FormBuilder,private profileService : ProfileServiceService, private insuranceService : InsuranceService) { }

  ngOnInit(): void {
    this.profileService.getProfile().subscribe(
      data => { console.log("1111122222"+data.toString()) ; },
      error => console.log     (error.message)
    )
    
    this.insuranceForm = this.formBuilder.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      coverage_amount: ['', Validators.required],
      premium: ['', Validators.required],
      type: ['', Validators.required],
      status: ['', Validators.required],
      user_id: [this.profile, Validators.required], // Assuming you want to select a user
      // sinisters: [] // Depending on how you want to handle sinisters
    });
  }

  onSubmit() {
    // Handle form submission here
    if (this.insuranceForm.valid) {
      //console.log(this.insuranceForm.value);
      console.log(this.insuranceForm);
      this.insuranceService.addInsurance(this.insuranceForm.value).subscribe(
        (data :any) => { console.log(data) ;
       
        },
        error => {console.log(error)}
       )
      // You can send this form data to your backend API for further processing
    }
}
}
