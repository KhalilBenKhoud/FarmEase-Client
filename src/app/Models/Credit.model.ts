import { LoanType } from "./LoanType";

export class Credit{
     idCredit!:number ; 
    amount!:number;
    monthlyPaymentAmount!:number;
    dateDemande!:Date;
    obtainingDate!:Date;
    monthlyPaymentDate!:Date;
    //0 PAS DE DIFFERE 1 SI CREDIT A DIFFERE TOTAL
    state!:boolean;
    differe!:boolean;
    DIFF_period!:number;
    //taux d'interet en année
    interestRate!:number;
    //periode de credit en année
    creditPeriod!:number;
    Risk!:number;
    Completed!:boolean;
    Reason!:String;
    showDetails!: boolean ; 
    qrCodeImage!: string; 
    idPack!: number;

   // Assurez-vous que le nom correspond au modèle utilisé pour LoanType dans Angular
  loanId: LoanType | undefined;
  packId: number | undefined;
  }
  