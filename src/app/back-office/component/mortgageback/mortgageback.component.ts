import { Component, OnInit } from '@angular/core';
import { MortgageService } from 'src/app/services/mortgage.service';
import { ApplicationService } from 'src/app/services/application.service';
declare const tmImage: any;
import { Product, TopSelling, TableRows, Employee } from '../marketplace/table-data';
import { Chart, registerables } from 'chart.js';

// refresh ajout refresh suppression tratement application modifier application /tri refresh delete application
@Component({
  selector: 'app-mortgageback',
  templateUrl: './mortgageback.component.html',
  styleUrls: ['./mortgageback.css']
})

export class MortgagebackComponent implements OnInit {
  model: any;
  webcam: any;
  labelContainer: any;
  maxPredictions: number=0;
  mortgages: any[] = [];
  newMortgage: any = {
    description_mortgage: '',
    duration_mortgage: '',
    prize_mortgage: null,
    month_payment: null,
    category_mortgage: '',
    type_mortgage: '',
    price_mortgage: null,
     materiels:[],
     interest:'',
   
    land_description:'',
  };
  newmateriel: any ={
    name_materiel:'',
      price_materiel:null,
      
    
    
    }
        
  updatingMortgage: any = null;
  visible: boolean = false;
  showLandInputs: boolean = false;
  grounds: any[] = []; // Nouvelle propriété pour stocker les ground_place
 materiel:any []=[];
 applications:any []=[];
 
application
:any={
  message_application:'',
  
}

  async init() {
    const URL = "https://teachablemachine.withgoogle.com/models/7BYpcy4ks/";

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    this.model = await tmImage.load(modelURL, metadataURL);
    this.maxPredictions = this.model.getTotalClasses();

    const flip = true;
    this.webcam = new tmImage.Webcam(200, 200, flip);
    await this.webcam.setup();
    await this.webcam.play();
    this.loop();
    
    this.labelContainer = document.getElementById("label-container");
    for (let i = 0; i < this.maxPredictions; i++) {
      this.labelContainer.appendChild(document.createElement("div"));
    }
  }
  async loop() {
    this.webcam.update();
    await this.predict();
    window.requestAnimationFrame(() => this.loop());
  }

  async predict() {
    const prediction = await this.model.predict(this.webcam.canvas);
    for (let i = 0; i < this.maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      this.labelContainer.childNodes[i].innerHTML = classPrediction;
    }
  }
  submitMessage(applicationId: number, message: string) {
    // Trouver l'application correspondante dans le tableau des applications
    const applicationToUpdate = this.applications.find(app => app.id_application === applicationId);
    // Mettre à jour le message de l'application
    this.application.message_application = message; // Utiliser l'application trouvée pour mettre à jour le message
    // Appeler la méthode updateApplication pour effectuer la mise à jour sur le serveur
    this.applicationService.updateApplication(applicationId,  this.application).subscribe(
      () => {
        console.log('Application message updated successfully');
      },
      (error) => {
        console.error('Error updating application message:', error);
      }
    );
  }
  acceptApplication(id: number) {
    this.applicationService.acceptApplication(id).subscribe(
      () => {
        console.log('Application accepted successfully');
        // Rafraîchir la liste des applications après l'acceptation
        // Par exemple, vous pouvez rappeler fetchApplicationsForMortgage() pour mettre à jour les applications associées à un prêt hypothécaire spécifique
      },
      (error) => {
        console.error('Error accepting application:', error);
      }
    );
  }
  
  refuseApplication(id: number) {
    this.applicationService.refuseApplication(id).subscribe(
      () => {
        console.log('Application refused successfully');
        // Rafraîchir la liste des applications après le refus
        // Par exemple, vous pouvez rappeler fetchApplicationsForMortgage() pour mettre à jour les applications associées à un prêt hypothécaire spécifique
      },
      (error) => {
        console.error('Error refusing application:', error);
      }
    );
  }
  fetchApplicationsForMortgage(id: number) {
    // Trouver le mortgage cliqué
    const clickedMortgage = this.mortgages.find(mortgage => mortgage.id_mortgage === id);
    // Vérifier s'il existe des applications pour ce mortgage
      // Mettre à jour la variable clickedMortgageApplications avec les applications appropriées
      console.log("apps " + clickedMortgage.applications)
      this.applications = clickedMortgage.applications;
    
  }
  
  fetchMortgages() {
    this.mortgageService.getAllMortgages().subscribe(
      (response) => {
        this.mortgages = response;
        console.log(this.mortgages);
      },
      (error) => {
        console.error('Error fetching mortgages:', error);
      }
    );
  }

  showLandPlace() {
    this.mortgageService.getAllGrounds().subscribe(
      (response) => {
        console.log(response);
        this.grounds = response;
      },
      (error) => {
        console.error('Error fetching mortgages:', error);
      }
    );
  }
  showmateriel() {
    this.mortgageService.getAllmateriel().subscribe(
      (response) => {
        console.log(response);
        this.materiel = response;
      },
      (error) => {
        console.error('Error fetching mortgages:', error);
      }
    );
  }
  
  showLandFields() {
    this.showLandInputs = !this.showLandInputs;
  }

  addMortgage() {
    this.mortgageService.addMortgage(this.newMortgage).subscribe(
      (response) => {
        console.log('Mortgage added successfully:', response);
        this.fetchMortgages();
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

  updateMortgage(mortgage: any, mortgage1: any) {
    this.updatingMortgage = { ...mortgage };
  }

  cancelUpdate() {
    this.updatingMortgage = null;
  }

  finalizeUpdate() {
    if (this.updatingMortgage) {
      this.mortgageService.updateMortgage(this.updatingMortgage.id_mortgage, this.updatingMortgage).subscribe(
        (response) => {
          console.log('Mortgage updated successfully:', response);
          this.fetchMortgages();
          this.updatingMortgage = null;
        },
        (error) => {
          console.error('Error updating mortgage:', error);
        }
      );
    }
  }
  
  addmateriel() {
    this.mortgageService.addMateriel(this.newmateriel).subscribe(
      (response) => {
        console.log('materiel added successfully:', response);
      
      },
      (error) => {
        console.error('Error adding materiel:', error);
      }
    );
  }
  deleteMortgage(id: number) {
    this.mortgageService.deleteMortgage(id).subscribe(
      (response) => {
        console.log('mortgage deleted successfully:', response);
        this.fetchMortgages();
      
      },
      (error) => {
        console.error('Error deleting mortgage:', error);
      }
      
    );
  }
  deleteapplication(id: number) {
    this.applicationService.deleteApplication(id).subscribe(
      (response) => {
        console.log('application deleted successfully:', response);
    
      
      },
      (error) => {
        console.error('Error deleting application:', error);
      }
      
    );
  }


  topSelling: any[];

  trow: any[]



  chart: any;

  

  

 


  getCountsByType1(data: any): { [key: string]: number } {
    const counts1: { [key: string]: number } = {};
    data.forEach((account : any) => {
      counts1[account.duration_mortgage] = counts1[account.duration_mortgage] + 1 || 1;
    });
    return counts1;
  }
  
  generateChart(counts1: { [key: string]: number }): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    const labels = Object.keys(counts1);
    const data = Object.values(counts1);
  
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Type Term of LoanType',
          data: data, // Sample data, replace with your actual statistics
          backgroundColor: [
            

            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            
            
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }





  
  createChart(counts: { [key: string]: number }): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      console.error('Failed to get 2D context for canvas');
      return;
    }
  
    const labels = Object.keys(counts);
    const data = Object.values(counts);
  
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Status of Loan',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }


  constructor(private mortgageService: MortgageService, private applicationService : ApplicationService) {
    this.topSelling = TopSelling;
    Chart.register(...registerables);
    this.trow = Employee;
    
  }
  ngOnInit(): void {
    
    setTimeout(() => {
      this.showLandPlace(); // Appel à la méthode pour récupérer les ground_place
      this.showmateriel();
      this.fetchMortgages();
    },1500)

    this.mortgageService.getAllMortgages().subscribe((data: any) => {
      const counts = this.getCountsByType1(data);
      this.createChart(counts);
    });

   
    

  }

}