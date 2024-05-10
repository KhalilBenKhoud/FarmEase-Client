import { Component } from '@angular/core';
import { Product, TopSelling, TableRows, Employee } from './table-data';
import { NgFor } from '@angular/common';
<<<<<<< HEAD
import { Sinister } from 'src/app/model/Sinister';
import { InsuranceService } from 'src/app/services/insurance.service';
import { Chart, registerables } from 'chart.js';
=======

import { CreditService } from 'src/app/services/Credit.service';
import { Credit } from 'src/app/Models/Credit.model';
import { Chart, registerables } from 'chart.js';
import { LoanType } from 'src/app/Models/LoanType';
import { packLoanService } from 'src/app/services/packLoan.service';


import { ProductService } from 'src/app/services/product.service';

import { Chart, registerables } from 'chart.js';
import { ProjectService } from 'src/app/services/project.service';
import { Project, ProjectCategory } from 'src/app/models/Project';

>>>>>>> main

@Component({
  selector: 'app-table',
  standalone: true,
  imports:[NgFor],
  templateUrl: 'marketplace.component.html'
})
export class MarketplaceComponent {
  products: any[] = [];


<<<<<<< HEAD
  constructor(private insService: InsuranceService  ) {
=======
  constructor(private projectserice: ProjectService, private productService: ProductService,private creditservice: CreditService , private packService : packLoanService ) {

>>>>>>> main

    this.topSelling = TopSelling;
    Chart.register(...registerables);
    this.trow = Employee;
  }

  chart: any;

<<<<<<< HEAD
=======

>>>>>>> main
  

  

  ngOnInit(): void {
<<<<<<< HEAD
    this.insService.getAllSinisters().subscribe((sinister: Sinister[]) => {
      const counts = this.getCountsByType1(sinister);
      this.createChart(counts);
    });
  }
  



  getCountsByType1(sinister: Sinister[]): { [key: string]: number } {
    const counts1: { [key: string]: number } = {};
    sinister.forEach(account => {
      counts1[account.type] = counts1[account.type] + 1 || 1;
=======
    this.creditservice.getCredits().subscribe((credit: Credit[]) => {
      const counts = this.getCountsByType(credit);
      this.createChart(counts);
    });

    this.packService.getLoanTypes().subscribe((loantype: LoanType[]) => {
      const counts1 = this.getCountsByType1(loantype);
      this.generateChart(counts1);
    });
        this.projectserice.getAllProjects().subscribe((project: Project[]) => {
      const counts = this.getCountsByType1(project);
      this.createChart(counts);
    });

}



  getCountsByType1(LoanType: LoanType[]): { [key: string]: number } {
    const counts1: { [key: string]: number } = {};
    LoanType.forEach(account => {
      counts1[account.termType] = counts1[account.termType] + 1 || 1;
>>>>>>> main
    });
    return counts1;
  }
  
  generateChart(counts1: { [key: string]: number }): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    const labels = Object.keys(counts1);
    const data = Object.values(counts1);
  
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Type Term of LoanType',
          data: data, // Sample data, replace with your actual statistics
          backgroundColor: [
            

            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            
            
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }





<<<<<<< HEAD
  
=======
  getCountsByType(credit: Credit[]): { [key: string]: number } {
    const counts: { [key: string]: number } = {};
    credit.forEach(account => {
      counts[account.status] = counts[account.status] + 1 || 1;
    });
    return counts;
  }

  createChart(counts: { [key: string]: number }): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      console.error('Failed to get 2D context for canvas');
      return;
    }
  
    const labels = Object.keys(counts);
    const data = Object.values(counts);
  
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Status of Loan',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }







  getCountsByType1(projectCategory: Project[]): { [key: string]: number } {
    const counts1: { [key: string]: number } = {};
    projectCategory.forEach(project => {
      counts1[project.projectCategory] = counts1[project.projectCategory] + 1 || 1;
    });
    return counts1;
  }
  
  generateChart(counts1: { [key: string]: number }): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    const labels = Object.keys(counts1);
    const data = Object.values(counts1);
  
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Type Term of LoanType',
          data: data, // Sample data, replace with your actual statistics
          backgroundColor: [
            

            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            
            
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }





  // getCountsByType(credit: Credit[]): { [key: string]: number } {
  //   const counts: { [key: string]: number } = {};
  //   credit.forEach(account => {
  //     counts[account.status] = counts[account.status] + 1 || 1;
  //   });
  //   return counts;
  // }
>>>>>>> main

  createChart(counts: { [key: string]: number }): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      console.error('Failed to get 2D context for canvas');
      return;
    }
  
    const labels = Object.keys(counts);
    const data = Object.values(counts);
  
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Status of Loan',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }





}