import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project, ProjectCategory, ProjectStatus } from '../models/Project';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Project2Service {

  private apiUrl = 'http://localhost:8080/api/v1/projects';

  constructor(private http: HttpClient) { }

  // Create a new project
  createProject(projectData: FormData): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/createproject`, projectData);
  }

  // Get all projects
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  // Get project by ID
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  // Update project
  updateProject(id: number, projectData: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, projectData);
  }

  // Delete project
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Check if project exists by ID
  projectExistsById(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/${id}`);
  }

  // Generate PDF for project
  generatePdfForProject(projectId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${projectId}/pdf`, { responseType: 'blob' });
  }

  // Get all project categories
  getProjectCategories(): ProjectCategory[] {
    return Object.values(ProjectCategory);
  }

  // Get all project statuses
  getProjectStatuses(): ProjectStatus[] {
    return Object.values(ProjectStatus);
  }
}
