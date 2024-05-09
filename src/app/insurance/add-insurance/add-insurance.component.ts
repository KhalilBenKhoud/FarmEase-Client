import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.css'],
  providers: [MessageService]
})
export class AddInsuranceComponent {

  stateOptions: any[] = [{ label: 'agricultural', value: 'AGRICULTURAL' },{ label: 'fishing', value: 'FISHING' }];
  durationOptions: any[] = [{ name: '3 months', value: 3 },{ name: '6 months', value: 6 }, { name: '1 year', value: 12 } ];
  franchiseOptions: any[] = [{ label: '3%', value: 0.03 }, { label: '5%', value: 0.05 }, { label: '7%', value: 0.07 }];
  
  type!: string;
  premium: number = 0; // Initialize premium to 0
  duration!: number;
  coverage!: number;
  franchise!: number;

  constructor(private messageService: MessageService, private insuranceService: InsuranceService, private router: Router) {}

  // Method to calculate premium based on coverage, type, duration, and franchise
  calculatePremium(): void {
    if (this.duration === 0) {
      // Handle zero duration (e.g., display an error message)
      return;
    }
      // Check for non-numeric types (example using type assertion)
  if (typeof this.coverage !== 'number' || typeof this.duration !== 'number' || typeof this.franchise !== 'number') {
    console.error('Invalid data types for premium calculation');
    return;
  } 
  console.log('Coverage:', this.coverage, 'Duration:', this.duration, 'Franchise:', this.franchise);

    // Implement your business logic here to calculate the premium
    // For demonstration purposes, let's say premium = coverage amount * duration * (1 + franchise)
    this.premium = this.coverage * this.duration * (1 + this.franchise);
  }

  showWarn(): void {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Fill all the fields' });
  }

  onInputChange(): void {
    // Call calculatePremium whenever an input changes
    this.calculatePremium();
  }
  handleInputChange() {
    this.calculatePremium();
  }

  onSubmit(): void {
    if (!this.type || !this.coverage || !this.duration || !this.franchise) {
      this.showWarn();
      return;
    }

    // Calculate premium before submitting
    this.calculatePremium();

    this.insuranceService.addInsurance({
      coverage_amount: this.coverage,
      premium: this.premium,
      type: this.type
    }, this.duration).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/viewInsurance']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
