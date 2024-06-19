import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TaskService } from '../service/task/task.service';
import { Task } from '../class/task/task';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent],
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
              item.priority,
              item.date
            )
          })
        }
      )
  }
}
