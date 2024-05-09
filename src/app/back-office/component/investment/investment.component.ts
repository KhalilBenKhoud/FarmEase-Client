import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';
import { ButtonModule } from 'primeng/button';
import { NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-ngbd-buttons',
  standalone: true,
  templateUrl: 'investment.component.html',
  imports: [
    FormsModule, ReactiveFormsModule , NgFor, NgIf,NgbPaginationModule,ButtonModule
  ]
})
export class InvestmentComponent implements OnInit {
  projects: Project[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Number of projects per page
  totalProjects: number = 0;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
      this.projectService.getAllProjects().subscribe(projects => {
        this.projects = projects;
        this.projects.forEach(project => {
          project.imageUrl = 'http://localhost:8080/images/' + project.imageUrl;
        });
        this.totalProjects = this.projects.length;
      });
  }
  deleteProject(projectId: number) {
    this.projectService.deleteProject(projectId).subscribe(
      () => {
        // Remove the deleted project from the projects array
        this.projects = this.projects.filter(project => project.id !== projectId);
        console.log('Project deleted successfully!');
      },
      error => {
        console.error('Error deleting project:', error);
        // Handle error appropriately
      }
    );
  }
  
  get pagedProjects() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalProjects);
    return this.projects.slice(startIndex, endIndex);
  }
}