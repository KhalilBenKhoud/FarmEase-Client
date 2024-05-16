export interface Sinister {
    id: number;
    dateSinister: Date;
    description: string;
    photo: string;
    amount: number;
    type: string;
    status: string;
    address: Location;
    insurance: Insurance;
  }
  
  export interface Location {
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }
  
  export interface Insurance {
    // Define Insurance properties here if needed
  }
  