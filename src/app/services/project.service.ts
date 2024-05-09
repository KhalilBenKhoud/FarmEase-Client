import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Project } from 'src/app/models/Project';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

interface Page<T> {
  content: T[]; // Array of data items
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  readonly apiUrl = "http://localhost:8080/api/v1";
  readonly projectsEndpoint = "/projects";
  readonly addProjectsEndpoint = "/projects/createproject";

  //constructor(private httpClient: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<any>(this.apiUrl + this.projectsEndpoint)
      .pipe(
        map(response => response.content) // Extract the array of projects from the 'content' property
      );
  }
  constructor(private http: HttpClient, private authService: AuthService) {}

  // // Get all projects (paginated)
  getProjects(page: number, size: number): Observable<Page<Project>> {
    const url = `/api/v1/projects?page=<span class="math-inline">\{page\}&size\=</span>{size}`;
    return this.http.get<Page<Project>>(url);
  }

  // Get all projects by a specific user (paginated)
  getProjectsByCreator(userId: number, page: number, size: number): Observable<Page<Project>> {
    const url = `${this.apiUrl}/projects/by-creator/${userId}?page=${page}&size=${size}`;
    return this.http.get<Page<Project>>(url);
  }

  // Get a project by ID
  getProjectById(projectId: number): Observable<Project> {
    const url = `${this.apiUrl}/projects/${projectId}`;
    return this.http.get<Project>(url);
  }

  // Create a new project
  createProject(project: Project, imageFile?: File): Observable<Project> {
    const formData = new FormData();
    formData.append('title', project.title);
    formData.append('description', project.description);
    formData.append('netIncomeLastYear', project.netIncomeLastYear.toString());
    formData.append('address', project.address);
    formData.append('goalAmount', project.goalAmount.toString());
    //formData.append('deadline', project.deadline.toISOString());
    formData.append('equityOffered', project.equityOffered.toString());
    formData.append('dividendPayoutRatio', project.dividendPayoutRatio.toString());
    formData.append('totalInvestment', project.totalInvestment.toString());
    formData.append('projectCategory', project.projectCategory.toString());
    if (imageFile) {
      formData.append('imageFile', imageFile);
    }
    const url = `${this.apiUrl}/projects/createproject`;
    return this.http.post<Project>(url, formData);
  }

  // Update a project
  updateProject(projectId: number, project: Project): Observable<Project> {
    const url = `${this.apiUrl}/projects/${projectId}`;
    return this.http.put<Project>(url, project);
  }

  // Delete a project by ID
  deleteProject(projectId: number): Observable<any> {
    const url = `${this.apiUrl}/projects/${projectId}`;
    return this.http.delete(url);
  }
  
}
