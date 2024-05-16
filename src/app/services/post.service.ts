import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  addPost(postData: any): Observable<any> {
    return this.http.post(`${environment.BaseApiUrl}/posts/add`, postData);
  }
  
  addpool(postData: any): Observable<any> {
    return this.http.post(`${environment.BaseApiUrl}/posts/add`, postData);
  }
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.BaseApiUrl}/posts/get`);
  }

 
  incrementLike(postId: number): Observable<any> {
    // Vous pouvez définir des en-têtes si nécessaire
    const headers = new HttpHeaders();
    // Effectuez la requête POST vers l'endpoint correspondant dans votre API
    return this.http.post(`${environment.BaseApiUrl}/posts/${postId}/like`, null, { headers });
  }
  updatePost(postData: any, postId: number): Observable<any> {
    return this.http.put<any>(`${environment.BaseApiUrl}/updatePost/${postId}`, postData);
  }
  incrementSignal(postId: number): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post(`${environment.BaseApiUrl}/posts/${postId}/signal`, null, { headers });
  }
  incrementStat1(postId: number): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post(`${environment.BaseApiUrl}/posts/${postId}/incrementStat1`, null, { headers });
  }

  incrementStat2(postId: number): Observable<any> {
    const headers = new HttpHeaders();
    return this.http.post(`${environment.BaseApiUrl}/posts/${postId}/incrementStat2`, null, { headers });
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete<any>(`${environment.BaseApiUrl}/posts/delete/${postId}`);
  }


  getPostsSortedByLikes(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.BaseApiUrl}/getPostsSortedByLikes`);
  }


}
