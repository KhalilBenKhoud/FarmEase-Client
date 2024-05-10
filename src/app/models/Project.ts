import { WeatherAverageDTO } from "./WeatherAverageDTO";

export interface Project {
  id?: number;
  title: string;
  description: string;
  netIncomeLastYear: number;
  address: string;
  goalAmount: number;
  deadline?: Date;
  equityOffered: number;
  dividendPayoutRatio: number;
  totalInvestment: number;
  projectCategory: ProjectCategory;
  projectStatus: ProjectStatus;
  createdAt?: Date;
  imageUrl?: string;
  weather?: WeatherAverageDTO;
}

export enum ProjectCategory {
  FARM = 'FARM',
  FISHING_BOAT = 'FISHING_BOAT'
}

export enum ProjectStatus {
  FUNDED = 'FUNDED',
  PENDING= 'PENDING', 
  PLEDGED = 'PLEDGED'
}
