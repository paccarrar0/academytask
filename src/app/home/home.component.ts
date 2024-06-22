import { Component, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { TaskService } from '../service/task/task.service';
import { Task } from '../class/task/task';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { NewModalComponent } from '../new-modal/new-modal.component';
import { DescModalComponent } from '../desc-modal/desc-modal.component';
import { ModalService } from '../service/modal/modal.service';
import { DatePipe } from '@angular/common';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    NewModalComponent,
    DescModalComponent,
    DatePipe,
    EditModalComponent,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private _taskService: TaskService,
    private modalService: ModalService,
    private route: ActivatedRoute
  ) {}

  public tasks!: Task[];
  public itemId!: number;
  public taskId!: string;
  public taskDescription!: string;
  public taskToShow!: Task;
  public userId!: string;

  openNewModal() {
    this.modalService.openModal('newModal');
  }

  loadTasks() {
    this._taskService.getTasks(this.userId).subscribe((retorno) => {
      this.tasks = retorno.map((item) => {
        return new Task(
          item.name,
          item.description,
          item.priority,
          item.date,
          item.id
        );
      });
    });
  }

  deleteTask(taskId: number) {
    this._taskService
      .deleteTask(taskId)
      .then(() => {
        this.loadTasks();
      })
      .catch((error) => {
        console.error('Erro ao deletar a tarefa:', error);
      });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['userId'];
    });
    console.log(this.userId)
    this.loadTasks();
  }

  onSubmit(newTask: Task) {
    let newTaskLocal = newTask;

    this._taskService.setTasks(newTaskLocal).subscribe(() => {
      this.loadTasks();
      location.reload();
    });
  }
}
