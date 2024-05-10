import { Credit } from "./Credit.model";
import { User } from "./user.model";
export class Garantor {
    // Other properties
    idGarantor!: number ; 
    nameGarantor!: string;
    secondnameGarantor!: string;
    salaryGarantor!: number;
    workGarantor!: string;
    qrString!: string;
    credit!: Credit; // Supposons que vous avez déjà un modèle Credit
    pdfDocument!: Blob | null; 
    user!: User;
}
