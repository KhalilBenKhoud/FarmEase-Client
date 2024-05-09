import { Project } from 'src/app/models/Project';

export interface Performance {
  id: number;
  projectTitle: string;
  netIncome: number;
  currentMarketValue: number;
  annualProjectedProfit: number;
  year: number;
  totalInvestment: number;
  project: Project;
}
