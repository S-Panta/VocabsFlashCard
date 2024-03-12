import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
@Injectable({
  providedIn:"root"
})
export class AuthService {
  private url = 'http://localhost:3000/login';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post(`${this.url}/login`, {username, password});
  }
}
