import { Project } from 'src/app/models/Project'; 
import { Investment } from 'src/app/models/Investment';
import { Wallet } from 'src/app/models/Wallet'; 

export enum Role {
  // Define enum values here if not already defined in Angular
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  role: Role;
  imageName?: string;
  enabled: boolean;
  registrationDate: Date;
  wallet: Wallet;
  createdProjects: Project[];
  investments: Investment[];
}
