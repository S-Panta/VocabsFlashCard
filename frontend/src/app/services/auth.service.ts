/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core'
import { type Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = 'http://localhost:3000/api'

  constructor (private readonly http: HttpClient) {
  }

  login (username: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { username, password }).pipe(
      tap((response: any) => {
        const token = response?.Authorization
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        localStorage.setItem('token', token)
      })
    )
  }

  signup (username: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.url}/signup`, { username, email, password, confirmPassword })
  }

  logout (): void {
    localStorage.removeItem('token')
  }
}
