export interface User {
    id: number;
    firstname: string;
    lastname: string;
    password: string;
    email: string;
    role: string;
    imageName?: string;
    enabled: boolean;
    registrationDate: Date;
    wallet?: Wallet; // Assuming you have a Wallet interface defined
    insurances?: Insurance[]; // Assuming you have an Insurance interface defined
  }
  
  export interface Wallet {
    // Define properties for the Wallet interface if needed
  }
  
  export interface Insurance {
    start_date : Date;
    end_date:Date;
    coverage_amount:number;
    // Define properties for the Insurance interface if needed
  }
  