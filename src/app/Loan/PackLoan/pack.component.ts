import { Component, OnInit } from '@angular/core';
import { packLoanService } from 'src/app/services/packLoan.service';
import { LoanType } from 'src/app/Models/LoanType';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mortgage',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css']
})
export class packComponent implements OnInit {

  LoanType: LoanType[] | undefined;
  selectedPackId: number | null = null;

  constructor(
    private packLoanService: packLoanService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getLoanTypes();
  }

  getLoanTypes(): void {
    this.packLoanService.getLoanTypes()
      .subscribe((data: LoanType[]) => {
        this.LoanType = data;
      });
  }

  redirectToApplyLoanPage(LoanType?: LoanType): void { // Optional argument for flexibility
    if (LoanType) {
      this.selectedPackId = LoanType.loanType_id; // Assuming loanTypeId holds the pack ID
    }
    // ... rest of your logic for redirection (e.g., navigate with packId)
    this.router.navigate(['/ApplyLoan'], { queryParams: {  loanTypeId: this.selectedPackId }});
  }
}
