import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Garantor } from 'src/app/Models/Garantor.model';
import { GuarantorService } from 'src/app/services/Garantor.service';

@Component({
  selector: 'app-garantor',
  templateUrl: './Garantor.component.html',
  styleUrls: ['./Garantor.component.css']
})
export class GarantorComponent implements OnInit {
  GarantorForm!: FormGroup;
  submitted = false;
  garantor: Garantor = new Garantor();
  creditId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private guarantorService: GuarantorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Récupérer le creditId des paramètres de route
    this.route.queryParams.subscribe(params => {
      this.creditId = +params['creditId'];
    });

    this.GarantorForm = this.formBuilder.group({
      nameGarantor: ['', Validators.required],
      secondnameGarantor: ['', Validators.required],
      salaryGarantor: ['', Validators.required],
      workGarantor: ['', Validators.required],
      qrString: null,
      credit: null,
    });
    
  }

  // Convenience getter for easy access to form fields
  get f() { return this.GarantorForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.GarantorForm.invalid) {
      return;
    }

    // Assign form values to Garantor instance
    this.garantor = this.GarantorForm.value;

    // Call addGarantor service method to add Garantor
    this.guarantorService.addGarantor(this.garantor).subscribe(
      () => {
        // Display success message on successful submission
        alert('Garantor added successfully.');
        // Navigate to another page after success
        this.router.navigate(['/upload']);
      },
      error => {
        // Handle error
        console.error('Error occurred while adding guarantor:', error);
        alert('Error occurred while adding guarantor. Please try again.');
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.GarantorForm.reset();
    this.garantor = new Garantor();
  }

  
}