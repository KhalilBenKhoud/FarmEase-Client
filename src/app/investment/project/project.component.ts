import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';
import { WeatherService } from 'src/app/services/weather.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  allProjects: Project[] = [];
  projects: Project[] = [];
  showInvestFormFlag: boolean = false;
  currentProject: Project | undefined;
  searchTerm: string = '';
  selectedCategory: string = '';
  constructor(
    private projectService: ProjectService,
    private weatherService: WeatherService
  ) {}
  

  ngOnInit() {
    this.projectService.getAllProjects()
      .subscribe(projects => {
        this.allProjects = projects;
        this.projects = projects;
        this.projects.forEach(project => {
          project.imageUrl = 'http://localhost:8080/images/' + project.imageUrl;
          this.weatherService.getWeatherForecast(project.address).subscribe(
            weather => (project.weather = weather[0]) // Assuming you only need the first forecast
          );
          
        });
      });
  }
  
  calculateProgress(totalInvestment: number, goalAmount: number): number {
    if (goalAmount === 0) {
      return 0; // Avoid division by zero
    }
    return Math.round((totalInvestment / goalAmount) * 100);
  }
  
  showInvestForm(project: Project): void {
    this.showInvestFormFlag = !this.showInvestFormFlag;
    this.currentProject = project;
  }   
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    // Filter projects based on selected category
    if (category === '') {
      this.projects = this.allProjects; // Reset to all projects if category is empty
    } else {
      this.projects = this.allProjects.filter(project => project.projectCategory === category);
    }
  }

  

}
