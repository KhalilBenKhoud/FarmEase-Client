import { User } from 'src/app/models/User'; 

export enum WalletStatus {
  // Define enum values here if not already defined in Angular
}

export interface Wallet {
  id: number;
  status: WalletStatus;
  balance: number;
  ownerName: string;
  user: User; 
}
