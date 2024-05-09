import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Investment } from 'src/app/models/Investment';
import { Project } from 'src/app/models/Project';
import { InvestmentService } from 'src/app/services/investment.service';
import { Project2Service } from 'src/app/services/project2.service';

import Swal from 'sweetalert2';

interface EventItem {
  status?: string;
  description?: string;
  role?:any;
  color?: string;
  image?: string;
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  project: Project | undefined;
  newInvestment: Investment = new Investment();
  investments: Investment[] = [];
  selectedInvestment: Investment;
  projectId: number;
  events: EventItem[];


  constructor(
    private route: ActivatedRoute,
    private projectService: Project2Service,
    private investmentService: InvestmentService
  ) {
    this.events = [
      { status: 'Net icome last year', color: '#9C27B0', image: 'https://www.10xsheets.com/wp-content/uploads/Net-Income-1-1200x343.jpg.avif', description: 'The profit earned by a company or individual after all expenses and taxes have been deducted from revenue.' },
      { status: 'dividend Payout Ratio', color: '#673AB7',image:'https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2023_04_Understanding-Break-Statement-in-C-43.jpg', description:'The dividend payout ratio is an important financial metric that provides valuable insights into a company’s dividend-paying capacity and financial health. In this article, we will be learning to calculate the dividend payout ratio in detail.' },
      { status: 'Equity offred',  color: '#FF9800',image:'https://www.investopedia.com/thmb/RMMCnF_rRcMnonXjZHPONcVgIb8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Term-Definitions_Private-equity-673345d975244a9894e68d9b072a7969.png', description:'A type of alternative investment in which the investors purchase shares in privately-held businesses.'},
      { status: 'Address',  color: '#607D8B',image:'https://media.wired.com/photos/5a6a61938c669c70314b300d/master/w_1600,c_limit/Google-Map-US_10.jpg',description:' the location of the project is important in choosing the rigght project to invest' }
  ];
  }
  
  
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.getProjectDetails(this.projectId);
    });
    
  }

  getProjectDetails(projectId: number): void {
    this.projectService.getProjectById(projectId)
      .subscribe(project => {
        this.project = project;
        project.imageUrl = 'http://localhost:8080/images/' + project.imageUrl;
        this.events.push(
          { status: 'Net Income Last Year', role: project?.netIncomeLastYear, color: '#9C27B0', image: 'https://www.10xsheets.com/wp-content/uploads/Net-Income-1-1200x343.jpg.avif', description: 'The profit earned by a company or individual after all expenses and taxes have been deducted from revenue.' },
          { status: 'Dividend Payout Ratio', role: project?.dividendPayoutRatio, color: '#673AB7', image: 'https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2023_04_Understanding-Break-Statement-in-C-43.jpg', description: 'The dividend payout ratio is an important financial metric that provides valuable insights into a company’s dividend-paying capacity and financial health.' },
          { status: 'Equity Offered', role: project?.equityOffered, color: '#FF9800', image: 'https://www.investopedia.com/thmb/RMMCnF_rRcMnonXjZHPONcVgIb8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Term-Definitions_Private-equity-673345d975244a9894e68d9b072a7969.png', description: 'A type of alternative investment in which the investors purchase shares in privately-held businesses.' },
          { status: 'Address', role: project?.address, color: '#607D8B', image: 'https://media.wired.com/photos/5a6a61938c669c70314b300d/master/w_1600,c_limit/Google-Map-US_10.jpg', description: 'The location of the project is important in choosing the right project to invest' }
        );
      });
  }

  downloadProjectReport() {
    if (this.projectId) {
      this.projectService.generatePdfForProject(this.projectId)
        .subscribe(response => {
          const blob: Blob = response;
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'project_report.pdf';
          link.click();
          window.URL.revokeObjectURL(url);
        });
    }
  }


  createInvestment() {
     this.investmentService.createInvestment(this.newInvestment, 1) // Replace 1 with the actual project ID
       .subscribe(createdInvestment => {
         this.investments.push(createdInvestment);
         this.newInvestment = new Investment(); // Clear form
       });
  }

  createInvestment2(): void {
    // Use this.projectId to create investment
    this.investmentService.createInvestment(this.newInvestment, this.projectId)
      .subscribe(
        (data) => {
          console.log('Investment created successfully:', data);
          this.successAlert();
          // Additional logic if needed
        },
        (error) => {
          console.error('Error creating investment:', error);
          this.failedAlert();
          // Handle error appropriately
        }
      );
  }

  @ViewChild('closeModal', { static: false }) closeModal: any;
  successAlert(){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "your investment has been created",
      showConfirmButton: false,
      timer: 1500
      
    }).then(() => {
      this.closeModal.nativeElement.click();
    });
    
  }

  failedAlert(){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  }

  

  getInvestmentById(id: number) {
    this.investmentService.getInvestmentById(id)
      .subscribe(investment => this.selectedInvestment = investment);
  }

  getAllInvestments() {
    this.investmentService.getAllInvestments()
      .subscribe(investments => this.investments = investments);
  }

  updateInvestment() {
    this.investmentService.updateInvestment(this.selectedInvestment)
      .subscribe(updatedInvestment => {
        this.selectedInvestment = updatedInvestment;
        // Update investments array if needed
      });
  }

  deleteInvestment(id: number) {
    this.investmentService.deleteInvestment(id)
      .subscribe(() => {
        this.investments = this.investments.filter(investment => investment.id !== id);
      });
  }


}
