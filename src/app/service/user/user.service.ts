import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../class/user/user';
import { Observable, catchError, throwError, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _httpClient: HttpClient) {}

  private url: string = "http://localhost:3000/users"

  getUsers(): Observable<any> {
    return this._httpClient.get(this.url).pipe(
      tap(() => console.log('Usuários carregados com sucesso.')),
      catchError(this.handleError)
    )
  }

  setUser(user: User): Observable<any> {
    return this._httpClient.post(this.url, user).pipe(
      tap(() => console.log('Usuário adicionado com sucesso.')),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Ocorreu um erro:', error);
    return throwError('Erro ocorreu, por favor tente novamente mais tarde.');
  }

}
