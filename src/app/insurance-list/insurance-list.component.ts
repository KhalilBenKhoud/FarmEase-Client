import { Component } from '@angular/core';
import { Insurance } from '../entities/User';
import { InsuranceService } from '../services/insurance.service';

@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.css']
})
export class InsuranceListComponent {
  insurances: Insurance[] = [];

  constructor(private insuranceService: InsuranceService) { }

  ngOnInit(): void {
    this.insuranceService.getAllInsurances().subscribe(
      (data: Insurance[]) => {
        this.insurances = data;
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
  }

}
