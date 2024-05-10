import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credit } from '../../../Models/Credit.model';
import { CreditService } from '../../../services/Credit.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './Applyloan.component.html',
  styleUrls: ['./Applyloan.component.css']
})
export class ApplyLoanComponent implements OnInit {
  loanForm!: FormGroup;
  submitted = false;
  credit: Credit = new Credit(); // Créer une instance de Credit
  creditDetailsVisible = false; // Ajouter une propriété pour gérer la visibilité des détails du crédit
  creditId: number | undefined; // Ajoutez une propriété pour stocker l'ID du prêt
  loanTypeId: number | undefined; 
  constructor(
    private formBuilder: FormBuilder,
    private creditService: CreditService,
    private router: Router,
    private route: ActivatedRoute // Add ActivatedRoute here
  ) { }

  ngOnInit() {
    this.loanForm = this.formBuilder.group({
      amount: ['', Validators.required],
      monthlyPaymentAmount: null,
      dateDemande: ['', Validators.required],
      obtainingDate: null,
      monthlyPaymentDate: null,
      state: null,
      differe: [false, Validators.required],
      DIFF_period: null,
      interestRate: null,
      creditPeriod: ['', Validators.required],
      Risk: null,
      Completed: null,
      Reason: ['', Validators.required] 
    });
    
    
    
  }

  // Convenience getter for easy access to form fields
  get f() { return this.loanForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loanForm.invalid) {
      return;
    }

    // Assign form values to Credit instance
    this.credit = this.loanForm.value;
    
    // Call addCredit service method to create Credit
    this.creditService.createCredit(this.credit).subscribe(
      (createdCredit: any) => { // Utilisation de 'any' pour accepter tout type de retour
        // Display form values on successful submission
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.credit, null, 4));
        // Retrieve the generated credit ID
        this.creditId = createdCredit.id;

        // Redirect to the second form with the generated credit ID
        this.router.navigate(['./Garantor'], { queryParams: { creditId: this.creditId } });
      },
      error => {
        // Handle error
        console.error('Error occurred while adding credit:', error);
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.loanForm.reset();
    this.credit = new Credit(); // Réinitialisez l'instance de Credit
  }

  toggleCreditDetails() {
    this.creditDetailsVisible = !this.creditDetailsVisible;
  }
}
