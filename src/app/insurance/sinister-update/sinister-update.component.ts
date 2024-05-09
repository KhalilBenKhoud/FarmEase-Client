import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Sinister } from 'src/app/model/Sinister';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { InsuranceService } from 'src/app/services/insurance.service';


@Component({
  selector: 'app-sinister-update',
  templateUrl: './sinister-update.component.html',
  styleUrls: ['./sinister-update.component.css']
})
export class SinisterUpdateComponent implements OnInit{

  sinister!: Sinister;
  updatedSinister!: Sinister;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, public insuranceService: InsuranceService) {}

  ngOnInit(): void {
    this.sinister = this.config.data.sinister; // Get the sinister passed from parent component
  }

  updateSinister(): void {
    this.insuranceService.updateSinister(this.sinister.id, this.sinister).subscribe(
      (updatedSinister: Sinister) => {
        this.ref.close(updatedSinister); // Close the dialog and pass the updated sinister back to parent component
      },
      (error) => {
        console.error('Error updating sinister:', error);
        // Handle error appropriately
      }
    );
}
}
