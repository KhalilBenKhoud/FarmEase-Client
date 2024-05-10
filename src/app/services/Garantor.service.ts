import { HttpClient , HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Garantor } from "../Models/Garantor.model";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GuarantorService {
  

  constructor(private httpClient: HttpClient) { }

  addGarantor(garantor: Garantor): Observable<Garantor> {
    const url = `${environment.BaseApiUrl}/addGarantor`;
    return this.httpClient.post<Garantor>(url, garantor);
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    const url = `${environment.BaseApiUrl}/pdf/upload`; // Mettez à jour l'URL de l'API pour le téléchargement du fichier
    return this.httpClient.post(url, formData);
  }

  getGarantors(): Observable<Garantor[]> {
    const url = `${environment.BaseApiUrl}/Garantor`;
    return this.httpClient.get<Garantor[]>(url);
  }


  getPdfDocument(id: number): Observable<HttpResponse<Blob>> {
    const url = `${environment.BaseApiUrl}/${id}/pdfDocument`;
    return this.httpClient.get(url, { observe: 'response', responseType: 'blob' });
  }


  getGarantorById(idGarantor: number): Observable<Garantor> {
    const url = `${environment.BaseApiUrl}/Garantor/${idGarantor}`;
    return this.httpClient.get<Garantor>(url);
  }
  
}