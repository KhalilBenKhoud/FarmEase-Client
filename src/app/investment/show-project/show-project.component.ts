import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/Project';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.css']
})
export class ShowProjectComponent implements OnInit{
  
  projects: Project[] = [];
  showInvestFormFlag: boolean = false;
  currentProject: Project | undefined;

  constructor(private projectService: ProjectService) {}
  

  ngOnInit() {
    this.projectService.getAllProjects()
      .subscribe(projects => {
        this.projects = projects;
        this.projects.forEach(project => {
          // Assuming imageUrl is a property of Project
          // Update the imageUrl to include the full URL where the images are served
           project.imageUrl = 'http://localhost:8080/images/' + project.imageUrl;
        });
      });
  }
  
  calculateProgress(project: Project): number {
    if (project.goalAmount === 0) {
      return 0; // Return 0 if the goalAmount is 0 to avoid division by zero
    }
    return (project.totalInvestment / project.goalAmount) * 100;
  }
  showInvestForm(project: Project): void {
    this.showInvestFormFlag = !this.showInvestFormFlag;
    this.currentProject = project;
  }
}
