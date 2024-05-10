import { Component, OnInit } from '@angular/core';
import { MortgageService } from '../services/mortgage.service';
import { ApplicationService } from '../services/application.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
 

  verificationCode: string = ''; // Initialisez la propriété ici
  randomCode: string='';

  id_mortgage!: number;
  mortgageDetails: any;
  application: any = {}; // Assurez-vous de définir les propriétés de votre formulaire ici

  constructor(
    private mortgageService: MortgageService,
    private applicationService: ApplicationService,
    private route: ActivatedRoute
  ) { }
  newapplication: any = {
   description_applition:'',

   interesting_rate_application: 0,
  
  
   
  };

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id_mortgage = params['id'];
      this.getMortgageById(this.id_mortgage);
    });
    this.generateRandomCode();

  }
  generateRandomCode() {
    // Génération d'un code aléatoire de 5 chiffres
    this.randomCode = Math.floor(10000 + Math.random() * 90000).toString();
  }
  getMortgageById(id: number): void {
    this.mortgageService.getMortgageById(id).subscribe(
      (response) => {
        this.mortgageDetails = response;
        console.log('Mortgage details:', this.mortgageDetails);
      },
      (error) => {
        console.error('Error fetching mortgage details:', error);
      }
    );
  }

  // Méthode pour ajouter une candidature
 
  addApplication() {
    // Vérification du code de vérification
    if (this.verificationCode === this.randomCode) {
      // Ajouter l'application si le code est correct
      this.applicationService.addApplication(this.newapplication, this.id_mortgage).subscribe(
        (response) => {
          console.log('Application added successfully:', response);
          // Réinitialisez les champs du formulaire après l'ajout réussi
          this.application = {};
          this.generateRandomCode;
        },
        (error) => {
          console.error('Error adding application:', error);
        }
      );
    }else {
      console.error('Incorrect verification code');

    }
  }}

