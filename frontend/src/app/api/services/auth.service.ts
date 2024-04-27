/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core'
import { throwError, type Observable } from 'rxjs'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly url = 'http://localhost:3000/api'

  constructor (private readonly http: HttpClient) {
  }

  login (username: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { username, password })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response?.Authorization)
        }),
        catchError(this.handleError)
      )
  }

  signup (username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/signup`, { username, email, password })
      .pipe(
        catchError(this.handleError)
      )
  }

  logout (): void {
    localStorage.removeItem('token')
  }

  private handleError (error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Error occurred:', error.error)
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error)
    }
    return throwError(() => new Error('Please try again later.'))
  }
}