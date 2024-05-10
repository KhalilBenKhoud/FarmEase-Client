import { Input, Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
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
import { saveAs } from 'file-saver';
import { FormsModule } from '@angular/forms'; 
import { HttpResponse } from '@angular/common/http';
import { Chart } from 'chart.js';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TextToImageService } from 'src/app/services/text-to-image.service';
import html2canvas from 'html2canvas';
import { NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-ngbd-alert',
  standalone: true,
  imports: [NgbAlertModule, NgFor, NgIf,FormsModule,NgbPaginationModule],
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
    
    .custom-btn {
      background-color: #006400; /* Vert foncé */
      color: white; /* Texte blanc */
      border: none; /* Supprimer la bordure si vous n'en voulez pas */
      padding: 10px 20px; /* Rembourrage pour le bouton */
      cursor: pointer; /* Curseur personnalisé pour les éléments cliquables */
    }
    
    .custom-btn:hover {
      background-color: white; /* Lorsque le curseur est sur le bouton, la couleur de fond devient blanche */
      color: #006400; /* Le texte devient vert foncé */
    }
    
    .custom-btn2 {
      background-color: #ff0000; /* Rouge */
      color: white; /* Texte blanc */
      border: none; /* Supprimer la bordure si vous n'en voulez pas */
      padding: 10px 20px; /* Rembourrage pour le bouton */
      cursor: pointer; /* Curseur personnalisé pour les éléments cliquables */
      border-radius: 5px; /* Ajout d'un arrondi aux coins du bouton */
      transition: background-color 0.3s ease; /* Animation de transition pour la couleur de fond */
    }
    
    .custom-btn2:hover {
      background-color: #cc0000; /* Lorsque le curseur est sur le bouton, la couleur de fond devient légèrement plus foncée */
    }
    
    .button-container {
      display: flex; /* Utilisation de Flexbox pour aligner les boutons sur la même ligne */
      justify-content: space-between; /* Espace uniforme entre les boutons */
    }
    
    .button-container {
      display: flex;
    }
    
    .space {
      margin: 0 10px; /* Ajoute un espace de 10 pixels entre les boutons */
    }
    
    .custom-btn {
      background-color: #ff6347; /* Corail */
      color: white; /* Texte blanc */
      border: none; /* Supprimer la bordure si vous n'en voulez pas */
      padding: 10px 20px; /* Rembourrage pour le bouton */
      cursor: pointer; /* Curseur personnalisé pour les éléments cliquables */
      border-radius: 5px; /* Ajoutez un arrondi aux coins du bouton */
      transition: background-color 0.3s ease; /* Animation de transition pour la couleur de fond */
    }
    
    .custom-btn:hover {
      background-color: #d9534f; /* Lorsque le curseur est sur le bouton, la couleur de fond devient plus foncée */
    }
    
    .custom-btn-green {
      background-color: #5cb85c; /* Vert */
    }
    
    .custom-btn-green:hover {
      background-color: #4cae4c; /* Lorsque le curseur est sur le bouton, la couleur de fond devient plus foncée */
    }
    
    .space {
      margin-left: 30px; /* Ajustez la valeur selon l'espace souhaité */
    }
    
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .left-panel {
      flex: 1;
      padding: 20px;
    }
    
    .right-panel {
      flex: 1;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    img {
      max-width: 100%;
      max-height: 100%;
      transition: transform 0.3s ease-in-out;
    }
    
    img:hover {
      transform: scale(1.1);
    }
    
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }
    
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh; /* Utiliser toute la hauteur de la fenêtre */
    }
    
    .box {
      display: flex;
      background-color: #007bff; /* Couleur de fond bleu */
      color: white; /* Texte en blanc pour contraster */
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); /* Ombre */
      width: 80%; /* Largeur de la boîte */
      max-width: 800px; /* Largeur maximale */
    }
    
    .left-panel {
      flex: 1; /* Prendre autant d'espace que possible */
      padding-right: 20px; /* Espacement à droite */
    }
    
    .right-panel {
      flex: 1; /* Prendre autant d'espace que possible */
    }
    
    img {
      max-width: 100%;
      max-height: 100%;
      border-radius: 5px; /* Ajouter des coins arrondis */
    }
    
    input[type="text"] {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: none;
      border-radius: 5px;
    }
    
    input[type="submit"] {
      width: 100%;
      padding: 10px;
      background-color: #0056b3; /* Couleur de fond bleu plus foncé */
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    
    .space {
      padding-top: 10px; /* Ajouter de l'espace au-dessus */
    }
    
    .loan-image img {
      height: 200px; /* Définir une hauteur fixe pour toutes les images */
      object-fit: cover; /* Assurer que l'image couvre entièrement son conteneur */
    }
    
    .custom-btn-blue {
      background-color: #007bff; /* Blue color */
      color: white; /* White text */
      border: none; /* No border */
      padding: 10px 20px; /* Padding */
      cursor: pointer; /* Pointer cursor */
      border-radius: 5px; /* Rounded corners */
      transition: background-color 0.3s ease; /* Smooth background color transition */
    }
    
    /* Style du modal */
    .modal {
      display: none; /* Par défaut, le modal est caché */
      position: fixed; /* Position fixe pour couvrir toute la page */
      z-index: 1; /* Empiler au-dessus du contenu */
      left: 0;
      top: 0;
      width: 100%; /* Couvrir toute la largeur */
      height: 100%; /* Couvrir toute la hauteur */
      overflow: auto; /* Activer le défilement si nécessaire */
      background-color: rgba(0, 0, 0, 0.4); /* Arrière-plan semi-transparent */
    }
    
    /* Style du contenu du modal */
    .modal-content {
      background-color: #fefefe;
      margin: 15% auto; /* Centrer le modal verticalement */
      padding: 20px;
      border: 1px solid #888;
      max-width: 400px; /* Définir une largeur maximale pour le contenu */
      width: 80%; /* Largeur du modal */
    }
    
    /* Style du bouton de fermeture */
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
    
    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
    
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0); /* Fond bleu semi-transparent */
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    
    .modal-content {
      background-color: #ffffff; /* Fond blanc pour la modal */
      padding: 20px;
      border-radius: 5px;
    }
    
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
  }
  
  .fullscreen-background {
      width: 100%;
      height: 100%;
      background-color: blue; /* ou toute autre couleur de fond que vous préférez */
      display: flex;
      justify-content: center;
      align-items: center;
  }
  
  .fullscreen-image {
      max-width: 100%;
      max-height: 100%;
  }
  .blue-background {
    background-color: #007bff; /* Couleur de fond bleue */
    color: white; /* Texte en blanc */
    padding: 40px; /* Rembourrage */
    width: 100%; /* Étendre sur toute la largeur de la page */
  }
  /* Style pour le conteneur */
.container {
  margin-top: 50px;
}

/* Style pour le paragraphe */
.paragraph-container {
  padding: 20px;
  background-color: #f8f9fa; /* Couleur de fond */
  border-radius: 10px; /* Coins arrondis */
}

.paragraph {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
}

/* Style pour l'image */
.image-container {
  text-align: center; /* Centrage horizontal de l'image */
}

.image-container img {
  max-width: 100%; /* Image s'adapte à la taille du conteneur */
  height: auto; /* Hauteur automatique pour garder les proportions */
}

    
.small-image {
  width: 400px; /* ou toute autre taille que vous souhaitez */
  height: auto; /* Garder le ratio d'aspect */
}
.chart-container {
  width: 400px;
  height: 400px;
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
  selectedLoanType: LoanType | null = null;
  selectedGarantor!: Garantor | null;
  imageFile!: File;
  loanType: any = {
    loanType_id: 0,
    name: '',
    value: 0,
    descprtion: '',
    image: Blob, // Remplacer null par le Blob de l'image sélectionnée
    termType: ''
  };
  showForm: boolean = true; // Initialisez-la à true si vous voulez afficher le formulaire par défaut

  
  garantors!: Garantor[];
  creditId!: number;
  garantor!: Garantor;
  showAddForm: boolean = false;
  showContainer: boolean = true;
 
  
  title = 'ng-background';
  imageurl!: SafeUrl;

  private textService = inject(TextToImageService);
  private sanitizer = inject(DomSanitizer);

  
  currentPage: number = 1;
  pageSize: number = 5; // Number of projects per page
  totalProjects: number = 0;



  constructor(
    private packLoanService: packLoanService, 
    private GarantorService : GuarantorService , 
    private creditService : CreditService ,
    private router: Router,
    private formBuilder: FormBuilder ,
    private route: ActivatedRoute , 
    private http: HttpClient
    
  ) {this.statusCounts = new Map<string, number>();
    
  }

  
  ngOnInit(): void {
    this.getLoanTypes();
    this.loadCredits();
    this.loadGarantors();   
    this.loadAverageCreditAmount();
    this.generateGraph();
   

  }
  


  


  onSubmit() {
    if (!this.imageFile || !this.loanType) {
      console.error('Missing image file or loan type data');
      return;
    }

    this.packLoanService.addLoanType(this.loanType, this.imageFile).subscribe(
      response => {
        console.log('Loan type added successfully:', response);
        // Réinitialiser les champs ou effectuer toute autre logique nécessaire après l'ajout réussi
      },
      error => {
        console.error('Error adding loan type:', error);
        // Gérer les erreurs ici, par exemple afficher un message à l'utilisateur
      }
    );

   
  
  }

 

  


  onSubmit2(form: NgForm) {
    let formData = new FormData();
    formData.append('prompt', form.value.text);

    console.log('Your form data : ', form.value.text);
    this.textService.textToImage(formData).subscribe({
      next: (res) => {
        console.log(res);
        let TYPED_ARRAY = new Uint8Array(res);

        const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
          return data + String.fromCharCode(byte);
        }, '');

        let base64String = btoa(STRING_CHAR);

        this.imageurl = this.sanitizer.bypassSecurityTrustUrl(
          'data:image/jpg;base64, ' + base64String
        );
        console.log(this.imageurl);
      },
      error: (error) => {
        alert(error);
      },
    });
    this.showForm = false;
  }

  openModal(creditId: number) {
    const modal = document.getElementById('garantModal');
    if (modal) {
      modal.style.display = 'block';
      this.getGarantorByCreditId(creditId);
    } else {
      console.error('Modal element not found.');
    }
  }
  
  closeModal() {
    const modal = document.getElementById('garantModal');
    if (modal) {
      modal.style.display = 'none';
    } else {
      console.error('Modal element not found.');
    }
  }
  
  // Fonction pour récupérer le garant par ID de crédit
  getGarantorByCreditId(creditId: number): void {
    this.GarantorService.getGarantorById(creditId)
      .subscribe((garantor: Garantor) => {
        this.garantors = [garantor]; // Mettez le garant dans un tableau pour l'affichage
      });
  }

  getLoanTypes(): void {
    this.packLoanService.getLoanTypes()
      .subscribe((data: LoanType[]) => {
        this.loanTypes = data;
        this.calculateTotalValue();
        
      });
     
  }

  
   // Assurez-vous que la propriété credits est déclarée dans votre composant
   @Input() credit!: Credit; // Input du crédit pour le composant
  updatedCredit: Credit = new Credit(); // Déclaration et initialisation de updatedCredit
  isModalOpen: boolean = false; // Boolean pour contrôler l'ouverture/fermeture du modal

  openModal2(): void {
    this.isModalOpen = true;
  }

  closeModal2(): void {
    this.isModalOpen = false;
  }
  


  
  

  viewGarantor(selectedCredit: Credit): void {
    if (selectedCredit && selectedCredit.idCredit) {
      const garantor = this.garantors.find(garantor => garantor.credit && garantor.credit.idCredit === selectedCredit.idCredit);
      if (garantor) {
        console.log(garantor);
        // Afficher les détails du garant ou effectuer d'autres actions ici
      } else {
        console.log('Aucun garant trouvé pour ce crédit.');
      }
    } else {
      console.log('Le crédit sélectionné est invalide ou son identifiant est manquant.');
    }
  }
  
  loadGarantors(): void {
    this.GarantorService.getGarantors().subscribe({
      next: garantors => {
        this.garantors = garantors;
      },
      error: err => {
        console.error('Erreur lors du chargement des garants', err);
      }
    });
  }



  loadCredits(): void {
    this.creditService.getCredits().subscribe((credits: Credit[]) => {
      this.credits = credits;
      this.calculateMonthlyPaymentTotal();
      this.calculateStatusCounts();
  
    });
  }

 
  showUpdatecredit(credit : Credit): void {
    this.selectedCredit = credit ;
  }


  editcredit(credit : Credit): void {
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


  
  
  showUpdateForm(loan: LoanType): void {
    this.selectedLoanType = loan;
  }


  editLoanType(loanType: LoanType): void {
    this.isEditMode = true;
    this.selectedLoanType = { ...loanType };
  }
  
  saveLoanType(): void {
    if (this.selectedLoanType) {
      this.packLoanService.updateLoanType(this.selectedLoanType.loanType_id, this.selectedLoanType).subscribe(
        () => {
          console.log('Loan type updated successfully');
          this.getLoanTypes(); // Rechargez la liste des types de prêt après la mise à jour
          this.cancelEditpack();
        },
        (error) => {
          console.error('Error updating loan type:', error);
        }
      );
    }
  }
  
  
  cancelEditpack(): void {
    this.isEditMode = false;
    this.selectedLoanType = null;
  }




  
  deleteLoanType(loanTypeId: number) {
    this.packLoanService.removeLoanType(loanTypeId).subscribe(
      data=>{
    
    this.loanTypes = this.loanTypes.filter((loanType) => loanType.loanType_id !== loanTypeId);
      })
  }
  

  deleteCredit(idCredit: number) {
    this.creditService.removeCredit(idCredit).subscribe(
      data=>{
    
    this.credits = this.credits.filter((Credit) => Credit.idCredit !== idCredit);
      })
  }











  selectCredit(credit: Credit): void {
    this.selectedCredit = credit;
    this.getGarantorByCreditId(credit.idCredit);
  }

  
  
  onFileSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  onImageSelected(event: any): void {
    if (this.selectedLoanType && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedLoanType.image = file;
    }
  }

  
  downloadPDF(id: number): void {
    this.GarantorService.getPdfDocument(id).subscribe((response: HttpResponse<Blob>) => {
      const filename = 'document.pdf'; // Nom de fichier par défaut
      const blob = response.body;
      if (blob) {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(blobUrl);
        document.body.removeChild(a);
      } else {
        console.error('Le contenu du PDF est vide.');
      }
    }, error => {
      console.error('Erreur lors du téléchargement du PDF', error);
    });
  }


  

 
  

  closeAlert(alert: IAlert): void {
    const index: number = this.alerts.indexOf(alert);
    if (index !== -1) {
      this.alerts.splice(index, 1);
    }
  }

  


    
 




 

 

  
  averageAmount!: number;
  loadAverageCreditAmount(): void {
    this.creditService.getAverageCreditAmount().subscribe(
      data => {
        this.averageAmount = data;
      },
      error => {
        console.log('Erreur lors du chargement de la moyenne du montant des crédits :', error);
      }
    );
  }

  monthlyPaymentTotal!: number;
  calculateMonthlyPaymentTotal(): void {
    this.monthlyPaymentTotal = this.credits.reduce((total, credit) => total + credit.monthlyPaymentAmount, 0);
  }

  totalValue: number = 0;
  calculateTotalValue(): void {
    this.totalValue = this.loanTypes.reduce((total, loanType) => total + loanType.value, 0);
  }

  statusCounts: Map<string, number> = new Map<string, number>();

  pieChart: any;
  calculateStatusCounts(): void {
    this.credits.forEach(credit => {
      const state = credit.status;
      if (state !== undefined) {
        const count = this.statusCounts.get(state);
        if (count !== undefined) {
          this.statusCounts.set(state, count + 1);
        } else {
          this.statusCounts.set(state, 1);
        }
      }
    });
  }
  



  generateGraph() {
    // Exemple de génération d'un graphique
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Accepted', 'Rejected', 'Pending'],
        datasets: [{
          label: 'Status',
          data: [
            this.credits.filter(credit => credit.status === 'Accepted').length,
            this.credits.filter(credit => credit.status === 'Rejected').length,
            this.credits.filter(credit => credit.status === 'Pending').length
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
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


 

}






export interface IAlert {
  id: number;
  type: string;
  message: string;
}