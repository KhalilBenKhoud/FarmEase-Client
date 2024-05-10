export interface User {
    id: number;
    firstname: string;
    lastname: string;
    password: string;
    credit_authorization: boolean;
    email: string;
    role: string; // Peut-être changer pour une énumération côté client si nécessaire
    imageName: string;
    enabled: boolean;
    registrationDate: Date;
    
  }