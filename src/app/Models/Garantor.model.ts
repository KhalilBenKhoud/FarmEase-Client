import { Credit } from "./Credit.model";

export class Garantor {
    // Other properties
    idGarantor!: number ; 
    nameGarantor!: string;
    secondnameGarantor!: string;
    salaryGarantor!: number;
    workGarantor!: string;
    qrString!: string;
    credit!: Credit;
    creditId!: number; // Add creditId property
    pdfDocument!: Blob | null; 
}
