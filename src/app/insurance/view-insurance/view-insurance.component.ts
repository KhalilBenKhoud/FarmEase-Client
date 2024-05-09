import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-view-insurance',
  templateUrl: './view-insurance.component.html',
  styleUrls: ['./view-insurance.component.css'],

})
export class ViewInsuranceComponent {
   insurances : any[] = [];
   searchStatus: string = '';
  


  constructor(private insuranceService : InsuranceService) {}


  ngOnInit() {
   this.getInsurances()
  }

  getInsurances() {
    this.insuranceService.getCurrentInsurances().subscribe(
      data => {this.insurances = data ; console.log(data) ;},
      error => {console.log(error) ;}
    )
  }
  filterInsurances() {
    if (!this.searchStatus) {
      // If search status is empty, display all insurances
      this.insurances = [...this.insurances];
    } else {
      // Filter insurances based on search status
      this.insurances = this.insurances.filter(insurance => {
        if (!insurance) {
          console.error("Encountered null insurance object");
          return false;
        }
        if (!insurance.status) {
          console.error("Insurance object does not have status property:", insurance);
          return false;
        }
        return insurance.status.toLowerCase().includes(this.searchStatus.toLowerCase());
      });
    }
  }
  }




