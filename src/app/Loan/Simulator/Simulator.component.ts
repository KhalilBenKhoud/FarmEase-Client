import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CreditService } from 'src/app/services/Credit.service'; 
import { Credit } from 'src/app/Models/Credit.model'; 
import { Chart, registerables } from 'chart.js/auto';
import { HttpResponse } from '@angular/common/http';
import { GuarantorService } from 'src/app/services/Garantor.service'; 
import { Garantor } from 'src/app/Models/Garantor.model'; 
import * as QRCode from 'qrcode-generator';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; 
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-Simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./Simulator.component.css']
})
export class SimulatorComponent implements OnInit, AfterViewInit {
  credits: Credit[] = [];
  simulationResult: any = {};
  selectedCredit: Credit | null = null;
  amount!: number;
  period!: number;
  interest!: number;
  showResults: boolean = false;
  amortisements: any[] = [];
  idCredit: number = 58;
  isLoading: boolean = false;
  creditPeriods: number[] = [];
  monthlyPaymentAmounts: number[] = [];
  
  speechSynthesis = window.speechSynthesis;
  garantors!: Garantor[];
  creditsAndGarantors: { credit: Credit, garantor: Garantor }[] = [];
  qrCodeImage!: string;
  pdfData: string | ArrayBuffer | null = null; 
  pdfUrl: SafeResourceUrl | undefined;
  loanAmount: number = 30000;
  interestRate: number = 8.5;
  loanTenure: number = 240;
  loanEMIValue: any;
  totalInterestValue: any;
  totalAmountValue: any;
  constructor(private creditService: CreditService, private garantorService: GuarantorService , private sanitizer: DomSanitizer) { }

  @ViewChild('creditChart') creditChart!: ElementRef<HTMLCanvasElement>;
  creditChartRef!: Chart<'bar' | 'line', any[], any>;

  ngOnInit(): void {
    this.getCombinedData();
    Chart.register(...registerables);
    this.loanEMIValue = document.querySelector(".loan-emi .value");
    this.totalInterestValue = document.querySelector(".total-interest .value");
    this.totalAmountValue = document.querySelector(".total-amount .value");

    // Gérez les événements du bouton "Calculate"
   const loanEMIElement = document.querySelector(".loan-emi .value");
const totalInterestElement = document.querySelector(".total-interest .value");
const totalAmountElement = document.querySelector(".total-amount .value");

if (loanEMIElement instanceof HTMLElement && 
    totalInterestElement instanceof HTMLElement &&
    totalAmountElement instanceof HTMLElement) {
    const loanEMIText = loanEMIElement.textContent;
    const totalInterestText = totalInterestElement.textContent;
    const totalAmountText = totalAmountElement.textContent;

    if (loanEMIText && totalInterestText && totalAmountText) {
        this.loanEMIValue = parseFloat(loanEMIText.trim()) || null;
        this.totalInterestValue = parseFloat(totalInterestText.trim()) || null;
        this.totalAmountValue = parseFloat(totalAmountText.trim()) || null;
    }
}
  
    // Récupérez le bouton Calculate
    const calculateBtn = document.querySelector(".calculate-btn");
    
    // Vérifiez si le bouton existe avant d'ajouter l'écouteur d'événements
    if (calculateBtn) {
      calculateBtn.addEventListener("click", () => {
        this.init();
      });
    }
    
  
  }

  init(): void {
    let emi = this.calculateEMI();
    this.updateData(emi);
  }

  ngAfterViewInit(): void {
    this.integrateMainScript();
    this.displayChart(this.totalInterestValue);
  }


  calculateEMI(): number {
    let interest = this.interestRate / 12 / 100;
    let emi = this.loanAmount * interest * (Math.pow(1 + interest, this.loanTenure) / (Math.pow(1 + interest, this.loanTenure) - 1));
    return Math.round(emi);
  }

  // Méthode de mise à jour des données
  updateData(emi: number): void {
    this.loanEMIValue.innerHTML = Math.round(emi);

    let totalAmount = Math.round(this.loanTenure * emi);
    this.totalAmountValue.innerHTML = totalAmount;

    let totalInterestPayable = Math.round(totalAmount - this.loanAmount);
    this.totalInterestValue.innerHTML = totalInterestPayable;

    // Affichez le graphique
    this.displayChart(totalInterestPayable);
  }
  chart: Chart<"pie", any[], string> | null = null;
  // Méthode pour afficher le graphique
  displayChart(totalInterestPayableValue: number): void {
    const ctx = document.getElementById("myChart") as HTMLCanvasElement | null;
    if (ctx) {
      if (this.chart) { // Vérification de l'existence de la propriété 'chart'
        this.chart.destroy(); // Destruction du graphique existant
      }
      this.chart = new Chart(ctx, { // Création d'un nouveau graphique
        type: "pie",
        data: {
          labels: ["Total Interest", "Principal Loan Amount"],
          datasets: [
            {
              data: [totalInterestPayableValue, this.loanAmount],
              backgroundColor: ["#e63946", "#14213d"],
              borderWidth: 0,
            },
          ],
        },
      });
    }
  }

  


  downloadPdf( idGarantor: number[]): void {
    idGarantor.forEach( idGarantor => {
      this.garantorService.getPdfDocument(idGarantor).subscribe((response: HttpResponse<Blob>) => {
        if (response.body) {
          const blob = new Blob([response.body], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.href = url;
          a.download = `document_${idGarantor}.pdf`; // Nom du fichier PDF à télécharger
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a); // Supprimer l'élément a après le téléchargement
        } else {
          console.error(`Le corps de la réponse pour l'ID ${idGarantor} est null.`);
        }
      });
    });
  }
  
  



  handlePdfResponse(data: Blob): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.pdfData = reader.result as ArrayBuffer;
    };
    reader.readAsArrayBuffer(data);
  }



  getCombinedData(): void {
    this.creditService.getCredits().subscribe(credits => {
      this.garantorService.getGarantors().subscribe(garantors => {
        for (let i = 0; i < credits.length; i++) {
          this.creditsAndGarantors.push({ credit: credits[i], garantor: garantors[i] });
        }
        this.generateQRCodes();
      });
    });
  }

  generateQRCodes(): void {
    this.creditsAndGarantors.forEach((item) => {
      const credit = item.credit;
      const qrCodeContent = `
        Montant: ${credit.amount},
        Date de demande: ${credit.dateDemande},
        Date d'obtention: ${credit.obtainingDate},
        Date de paiement mensuel: ${credit.monthlyPaymentDate},
        État: ${credit.status ? 'Accepted' : 'Rejected'},
        Différé: ${credit.differe ? 'Oui' : 'Non'},
        Période de différé: ${credit.DIFF_period},
        Taux d'intérêt: ${credit.interestRate} %,
        Période de crédit: ${credit.creditPeriod} ans
      `;
      item.credit.qrCodeImage = this.generateQRCode(qrCodeContent);
    });
  }

  generateQRCode(content: string): string {
    const qr = QRCode(0, 'M');
    qr.addData(content);
    qr.make();
    return qr.createDataURL();
  }

  integrateMainScript(): void {
    // Your integration script here
  }

  simulate() {
    this.creditService.simulate(this.amount, this.period, this.interest)
      .subscribe(
        (result) => {
          this.simulationResult = result;
          console.log('Résultat de la simulation:', this.simulationResult);
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la simulation : ', error);
        }
      );
  }

  calculateMonthlyPayment(amount: number, interestRate: number, period: number, isYears: boolean = true): number {
    if (!isYears) {
      period = period / 12;
    }

    const monthlyInterestRate = interestRate / 12 / 100;

    const monthlyPayment = amount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -period));

    return monthlyPayment;
  }

  calculateAmortisement(): void {
    const amount = parseFloat(this.amount.toString());
    const interestRate = parseFloat(this.interest.toString());
    const period = parseFloat(this.period.toString());

    const monthlyPayment = this.calculateMonthlyPayment(amount, interestRate, period);
    const totalAmortizedValue = monthlyPayment * period * 12;
    const totalInterest = totalAmortizedValue - amount;

    const amortization = totalAmortizedValue / (period * 12);

    this.simulationResult = {
      amount: amount,
      interest: totalInterest,
      monthlyPayment: monthlyPayment,
      amortization: amortization
    };
    this.showResults = true;
  }

  calculateTotalAmount(): number {
    let totalAmount = 0;
    for (const credit of this.credits) {
      totalAmount += credit.amount;
    }
    return totalAmount;
  }

  downloadExcel(idCredits: number[]) {
    idCredits.forEach(idCredit => {
      this.creditService.exportToExcel(idCredit).subscribe(
        (response: HttpResponse<Blob>) => {
          if (response.body) {
            const file = new Blob([response.body], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = `credit_${idCredit}.xlsx`; // Use a dynamic name for each file
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          } else {
            console.error(`Error: Response body for idCredit ${idCredit} is null.`);
          }
        },
        error => {
          console.error(`Error downloading the file for idCredit ${idCredit}:`, error);
        }
      );
    });
  }
  

  selectCredit(credit: Credit) {
    this.selectedCredit = credit;
  }

  speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);

    // Attendre que les voix soient chargées de manière asynchrone
    speechSynthesis.onvoiceschanged = () => {
        // Récupérer les voix disponibles
        const voices = speechSynthesis.getVoices();
        // Chercher la voix en arabe
        const arabicVoice = voices.find(voice => voice.lang === 'ar');
        // Utiliser la voix en arabe si elle est disponible
        if (arabicVoice) {
            utterance.voice = arabicVoice;
            // Lancer la synthèse vocale
            speechSynthesis.speak(utterance);
        } else {
            console.warn('Aucune voix en arabe n\'est disponible.');
        }
    };
}

  onMouseEnter(text: string) {
    this.speak(text);
  }
  isAnimating(index: number): boolean {
    // Implémentez votre logique pour déterminer l'état de l'animation en fonction de l'index ici
    // Ceci n'est qu'un exemple
    return index % 2 === 0; // Simuler l'animation sur chaque autre carte
  }

  // Define toggleCreditDetails method
  toggleCreditDetails(credit: any) {
    credit.showDetails = !credit.showDetails;
  }

  // Define isPulsing method
  isPulsing(index: number): boolean {
    // Implement your logic here to determine button pulsating state based on index
    // This is just a placeholder for now
    return index % 3 === 0; // Simulate pulsing every third button
  }

  
}
