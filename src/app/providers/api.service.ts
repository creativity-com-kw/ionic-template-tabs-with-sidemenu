import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  init() {
    return this.httpClient.get<any>(`${this.apiBaseUrl}/init`).pipe(
      catchError(this.handleError)
    );
  }

  login(payload: any) {
    return this.httpClient.post<any>(`${this.apiBaseUrl}/auth/login`, payload).pipe(
      catchError(this.handleError)
    );
  }

  logout() {
    return this.httpClient.post<any>(`${this.apiBaseUrl}/auth/logout`, {}).pipe(
      catchError(this.handleError)
    );
  }

  forgotPassword(payload: any) {
    return this.httpClient.post<any>(`${this.apiBaseUrl}/auth/forgot-password`, payload).pipe(
      catchError(this.handleError)
    );
  }

  changePassword(payload: any) {
    return this.httpClient.put<any>(`${this.apiBaseUrl}/auth/change-password`, payload).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

}
