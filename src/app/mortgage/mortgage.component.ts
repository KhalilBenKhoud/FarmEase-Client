import { Component, OnInit } from '@angular/core';
import { MortgageService } from '../services/mortgage.service';
import { ApplicationService } from '../services/application.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
//my application tri 
@Component({
  selector: 'app-mortgage',
  templateUrl: './mortgage.component.html',
  styleUrls: ['./mortgage.component.css']
})
export class MortgageComponent implements OnInit {
  showApplyFormFlag: boolean = false;
  mortgages: any[] = [];
  userApplications: any[] = []; // Variable pour stocker les applications de l'utilisateur connecté
newmateriel: any ={
name_materiel:'',
  price_materiel:null,
  


}
 
  newMortgage: any = {
    description_mortgage: '',
    duration_mortgage: null,
    prize_mortgage: null,
    month_payment: null,
    category_mortgage: '',
    type_mortgage: '',
    price_mortgage: null
  };
  result: any;
  resultgoogle: any;
  queryFormGroup!: FormGroup;
  updatingMortgage: any = null; // To store the mortgage being updated
  newapplication :any = {
    nom_application: '',
    prenom_application: '',
    interesting_rate_application: 0,
    description_application: ''
    
  };
  
  constructor(private mortgageService: MortgageService,private ApplicationService : ApplicationService,private fb:FormBuilder,private http:HttpClient) { }

  ngOnInit(): void {
    this.fetchMortgages();
    this.queryFormGroup = this.fb.group({
      query: this.fb.control("",Validators.required)
    });

    // Appel à la méthode pour récupérer les applications de l'utilisateur connecté

  }
  googleAI() {
    let url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=";
    let API_KEY = "AIzaSyBqR3-TbIauhEIoSd0-FoK3U5AJ_NP-DK8";
  
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("x-goog-api-key", API_KEY);
  
    // Create a new array of content with the user's query
    let newContent = [
      {
        role: "user",
        parts: [{ text: "hello "+this.queryFormGroup.value.query }]
      }
    ];
  
    let payload = {
      contents: newContent
    };
    
    this.http.post(url + API_KEY, payload, { headers: headers })
      .subscribe({
        next: (resp) => {
          this.resultgoogle = resp;
          //console.log(resp);
         
    //
          this.queryFormGroup.reset();
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  fetchUserApplications() {
    this.ApplicationService.getApplicationsByUserId().subscribe(
      (response) => {
        this.userApplications = response;
        console.log(response) ;
      },
      (error) => {
        console.error('Error fetching user applications:', error);
      }
    );
  }
 
  exportApplicationToPdf(applicationId: number) {
    this.ApplicationService.exportApplicationToPdf(applicationId).subscribe(
      () => {
        console.log('Application exported to PDF successfully');
        // Ajoutez ici le code pour gérer le succès de l'exportation
      },
      (error) => {
        console.error('Error exporting application to PDF:', error);
        // Ajoutez ici le code pour gérer les erreurs lors de l'exportation
      }
    );
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
  submitApplication(mortgageId: number) {


    console.log(this.newapplication);

    this.ApplicationService.addApplication(this.newapplication, mortgageId).subscribe(
      (response) => {
        console.log('Application added successfully:', response);
        // Add any additional logic after successful submission
      },
      (error) => {
        console.error('Error adding application:', error);
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

  showApplyForm() {
    this.showApplyFormFlag = !this.showApplyFormFlag;
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
  deleteapplication(id: number) {
    this.ApplicationService.deleteApplication(id).subscribe(
      (response) => {
        console.log('application deleted successfully:', response);
        this.fetchMortgages(); // Refresh the list of mortgages
      },
      (error) => {
        console.error('Error deleting application:', error);
      }
    );
  }
}
