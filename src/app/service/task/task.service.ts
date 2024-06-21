import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../class/task/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _httpClient: HttpClient) { }
  private url = "http://localhost:3000/tasks";

  getTasks(): Observable<Task[]>{
    return this._httpClient.get<Task[]>(this.url);
  }

  setTasks(task: Task): Observable<Task[]> {
    return this._httpClient.post<Task[]>(this.url, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.url}/${taskId}`);
  }

  updateTask(taskId: number, data: Task): Observable<Task> {
    return this._httpClient.put<Task>(`${this.url}/${taskId}`, data)
  }
}