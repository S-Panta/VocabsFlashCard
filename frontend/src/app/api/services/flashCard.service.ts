/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core'
import { type Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class FlashcardService {
  private readonly url = environment.apiUrl;
  private readonly baseUrl = `${this.url}/flashcards`;

  constructor(private http: HttpClient) {}

  getFlashcardById(id: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/${id}`, { headers: headers });
  }
}
  