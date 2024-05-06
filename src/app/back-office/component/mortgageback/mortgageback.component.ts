import { Component, OnInit } from '@angular/core';
import { MortgageService } from 'src/app/services/mortgage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mortgageback',
  templateUrl: './mortgageback.component.html',
  standalone:true
})

export class MortgagebackComponent implements OnInit {
  mortgages: any[] = [];
  newMortgage: any = {
    description_mortgage: '',
    duration_mortgage: null,
    prize_mortgage: null,
    month_payment: null,
    category_mortgage: '',
    type_mortgage: '',
    price_mortgage: null
  };
  updatingMortgage: any = null; // To store the mortgage being updated

  constructor(private mortgageService: MortgageService) { }

  ngOnInit(): void {
    this.fetchMortgages();
  }

  fetchMortgages() {
    this.mortgageService.getAllMortgages().subscribe(
      (response) => {
        this.mortgages = response;
      },
      (error) => {
        console.error('Error fetching mortgages:', error);
      }
    );
  }

  addMortgage() {
    this.mortgageService.addMortgage(this.newMortgage).subscribe(
      (response) => {
        console.log('Mortgage added successfully:', response);
        this.fetchMortgages(); // Refresh the list of mortgages
        this.resetNewMortgage();
      },
      (error) => {
        console.error('Error adding mortgage:', error);
      }
    );
  }

  resetNewMortgage() {
    this.newMortgage = {
      description_mortgage: '',
      duration_mortgage: null,
      prize_mortgage: null,
      month_payment: null,
      category_mortgage: '',
      type_mortgage: '',
      price_mortgage: null
    };
  }

  // Update method modified to set the updatingMortgage
  updateMortgage(mortgage: any, mortgage1: any) {
    // Copy the mortgage to update
    this.updatingMortgage = { ...mortgage };
  }

  // Method to cancel updating the mortgage
  cancelUpdate() {
    this.updatingMortgage = null;
  }

  // Method to finalize updating the mortgage
  finalizeUpdate() {
    if (this.updatingMortgage) {
      this.mortgageService.updateMortgage(this.updatingMortgage.id_mortgage, this.updatingMortgage).subscribe(
        (response) => {
          console.log('Mortgage updated successfully:', response);
          this.fetchMortgages(); // Refresh the list of mortgages
          this.updatingMortgage = null; // Reset updatingMortgage
        },
        (error) => {
          console.error('Error updating mortgage:', error);
        }
      );
    }
  }

  deleteMortgage(id: number) {
    this.mortgageService.deleteMortgage(id).subscribe(
      (response) => {
        console.log('Mortgage deleted successfully:', response);
        this.fetchMortgages(); // Refresh the list of mortgages
      },
      (error) => {
        console.error('Error deleting mortgage:', error);
      }
    );
  }
}
