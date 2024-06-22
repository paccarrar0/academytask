import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { Task } from '../../class/task/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private _httpClient: HttpClient) {}
  private url = 'http://localhost:3000/tasks';

  getTasks(userId?: string): Observable<Task[]> {
    let url = `http://localhost:3000/tasks?userId=${userId}`
    return this._httpClient.get<Task[]>(url).pipe(
      tap(() => console.log('Dados recebidos com sucesso.')),
      catchError(this.handleError)
    );
  }

  setTasks(task: Task): Observable<Task[]> {
    return this._httpClient.post<Task[]>(this.url, task).pipe(
      tap(() => console.log('Tarefa adicionada com sucesso.')),
      catchError(this.handleError)
    );
  }

  deleteTask(taskId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._httpClient
        .delete<void>(`${this.url}/${taskId}`)
        .toPromise()
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  updateTask(taskId: string, data: Task): Observable<Task> {
    return this._httpClient.put<Task>(`${this.url}/${taskId}`, data).pipe(
      tap(() => console.log(`Tarefa com ID ${taskId} atualizada com sucesso.`)),
      catchError(this.handleError)
    );
  }

  patchTask(taskId: string, dataToUpdate: Partial<Task>): Observable<Task> {
    return this._httpClient
      .patch<Task>(`${this.url}/${taskId}`, dataToUpdate)
      .pipe(
        tap(() =>
          console.log(
            `Tarefa com ID ${taskId} parcialmente atualizada com sucesso.`
          )
        ),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Ocorreu um erro:', error);
    return throwError('Erro ocorreu, por favor tente novamente mais tarde.');
  }
}
