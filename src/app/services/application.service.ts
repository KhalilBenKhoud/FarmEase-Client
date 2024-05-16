import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  addApplication(application: any, mortgageId: number): Observable<any> {
    const headers = new HttpHeaders();
    const body = application; // Utilisez directement l'objet application, pas besoin de l'emballer dans un autre objet
    // Envoyez l'ID du prêt hypothécaire en tant que paramètre de chemin dans l'URL
    return this.http.post<any>(`${environment.BaseApiUrl}/applications/add/${mortgageId}`, body, { headers });
  }
  exportApplicationToPdf(id: number): Observable<void> {
    return this.http.post<void>(`${environment.BaseApiUrl}/applications/${id}/export`, {});
  }
  getAllApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.BaseApiUrl}/applications/all`);  }
    getApplicationsByIdMortgage(idMortgage: number): Observable<any[]> {
      return this.http.get<any[]>(`${environment.BaseApiUrl}/applications/by-mortgage/${idMortgage}`);
    }
    getApplicationsByUserId(): Observable<any[]> {
      return this.http.get<any[]>(`${environment.BaseApiUrl}/applications/user`);
    }
    deleteApplication(applicationId: number): Observable<void> {
      // Utilisez une requête HTTP DELETE pour supprimer l'application avec l'ID spécifié
      return this.http.delete<void>(`${environment.BaseApiUrl}/applications/${applicationId}`);
    }
    acceptApplication(id: number): Observable<void> {
      return this.http.put<void>(`${environment.BaseApiUrl}/applications/accept/${id}`, {});
    }
  
    refuseApplication(id: number): Observable<void> {
      return this.http.put<void>(`${environment.BaseApiUrl}/applications/refuse/${id}`, {});
    }
    updateApplication(id: number, application: any): Observable<void> {
      // Utilisez l'ID de l'application comme paramètre de chemin dans l'URL et l'objet application comme corps de la requête
      return this.http.put<void>(`${environment.BaseApiUrl}/applications/${id}`, application);
    }
}
