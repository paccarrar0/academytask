import { Component, OnInit } from '@angular/core';
import { TaskService } from '../service/home/task.service';
import { Task } from '../class/task/task';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private _taskService: TaskService){}
  
  public tasks!: Task[];

  ngOnInit(): void {
    this._taskService.getTasks()
      .subscribe(
        retorno => {
          this.tasks = retorno.map (item => {
            return new Task(
              item.id,
              item.name,
              item.description,
              item.priority
            )
          })
        }
      )
  }
}



