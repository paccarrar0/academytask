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
}
