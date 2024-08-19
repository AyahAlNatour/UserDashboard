import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
      catchError(this.handleError<any>('getUsers', []))
    );
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError<any>('getUser', {}))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private userCache = new Map<number, any>();

getUser(id: number): Observable<any> {
  if (this.userCache.has(id)) {
    return of(this.userCache.get(id));
  }
  return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
    tap(user => this.userCache.set(id, user)),
    catchError(this.handleError<any>('getUser', {}))
  );
}

}
