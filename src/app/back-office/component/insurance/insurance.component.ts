import { Component } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';

import { Sinister } from 'src/app/model/Sinister';
import { InsuranceService } from 'src/app/services/insurance.service';
import { Chart, registerables } from 'chart.js';


@Component({
  selector: 'app-ngbd-pagination',
  standalone: true,
  imports: [NgbPaginationModule, NgIf],
  templateUrl: './insurance.component.html',
})
export class InsuranceComponent {
  

  constructor(private insService: InsuranceService  ) {

   
  }

  chart: any;

  

  

  ngOnInit(): void {
    this.insService.getAllSinisters().subscribe((sinister: Sinister[]) => {
      const counts = this.getCountsByType1(sinister);
      this.createChart(counts);
    });
  }
  



  getCountsByType1(sinister: Sinister[]): { [key: string]: number } {
    const counts1: { [key: string]: number } = {};
    sinister.forEach(account => {
      counts1[account.type] = counts1[account.type] + 1 || 1;
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
