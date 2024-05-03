import { Input, Component, OnInit } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { packLoanService } from 'src/app/services/packLoan.service';
import { LoanType } from 'src/app/Models/LoanType';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Garantor } from 'src/app/Models/Garantor.model'; 
import { AsyncPipe } from '@angular/common';
import { Credit } from 'src/app/Models/Credit.model'; 
import { GuarantorService } from 'src/app/services/Garantor.service';
import { CreditService } from 'src/app/services/Credit.service';
import { FormBuilder } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-ngbd-alert',
  standalone: true,
  imports: [NgbAlertModule, NgFor, NgIf,FormsModule],
  templateUrl: 'loan.component.html',
  styles: [
    `
      .alert-custom {
        color: #cc4dd5;
        background-color: #f0c4f3;
        border-color: #f0c4f3;
      }
      .loan-card {
        margin-bottom: 20px;
      }
      
      .loan-image img {
        max-width: 100%;
        height: auto;
      }
      
    `,
  ], 
})
export class LoanComponent implements OnInit  {
  @Input() public alerts: Array<IAlert> = [];
  loanTypes: LoanType[] = [];
  credits: Credit[] = [];
  isEditMode: boolean = false;
  selectedCredit: Credit | null = null; // Initialisation à null

  constructor(
    private packLoanService: packLoanService, 
    private GarantorService : GuarantorService , 
    private creditService : CreditService ,
    private router: Router,
    private formBuilder: FormBuilder ,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.getLoanTypes();
    this.loadCredits();  
  }

  getLoanTypes(): void {
    this.packLoanService.getLoanTypes()
      .subscribe((data: LoanType[]) => {
        this.loanTypes = data;
      });
  }

  

  loadCredits(): void {
    this.creditService.getCredits().subscribe((credits: Credit[]) => {
      this.credits = credits;
    });
  }

  editCredit(credit: Credit): void {
    this.isEditMode = true;
    this.selectedCredit = { ...credit };
  }

  saveCredit(): void {
    if (this.selectedCredit) {
      this.creditService.updateCredit(this.selectedCredit, this.selectedCredit.idCredit).subscribe(
        () => {
          console.log('Credit updated successfully');
          this.loadCredits();
          this.cancelEdit();
        },
        (error) => {
          console.error('Error updating credit:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.selectedCredit = null;
  }

  closeAlert(alert: IAlert): void {
    const index: number = this.alerts.indexOf(alert);
    if (index !== -1) {
      this.alerts.splice(index, 1);
    }
  }

  deleteLoanType(loanTypeId: number) {
    this.packLoanService.removeLoanType(loanTypeId).subscribe(
      data=>{
    
    this.loanTypes = this.loanTypes.filter((loanType) => loanType.loanType_id !== loanTypeId);
      })
  }
  


}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
