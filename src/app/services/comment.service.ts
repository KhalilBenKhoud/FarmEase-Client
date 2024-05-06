import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  // Récupérer tous les commentaires
  getComments(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.BaseApiUrl}/Comment`);
  }
  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.BaseApiUrl}/Comment/post/${postId}`);
  }

  // Récupérer un commentaire par son ID
  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${environment.BaseApiUrl}/Comment/${id}`);
  }

  // Ajouter un commentaire à un post spécifique
 
  addComment(comment: any, postId: number): Observable<any> {
    return this.http.post<any>(`${environment.BaseApiUrl}/Comment/add/${postId}`, comment);
  }
}
