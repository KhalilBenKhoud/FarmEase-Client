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
}
