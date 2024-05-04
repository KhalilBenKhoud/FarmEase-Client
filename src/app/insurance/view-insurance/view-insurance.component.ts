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



}
