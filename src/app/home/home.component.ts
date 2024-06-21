import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router'
import { TaskService } from '../service/task/task.service';
import { Task } from '../class/task/task';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { NewModalComponent} from '../new-modal/new-modal.component'
import { DescModalComponent } from '../desc-modal/desc-modal.component';
import { ModalService } from '../service/modal/modal.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, NewModalComponent, DescModalComponent, DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private _taskService: TaskService,
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  public tasks!: Task[];
  public itemId!: number;
  public taskId!: number;
  public taskDescription: Task = new Task('', '', '', '', '')

  openNewModal() {
    console.log('open new modal')
    this.modalService.openModal('newModal');
  }

  openDescModal(taskId: number) {
    this.taskId = taskId;
    this.taskDescription = this.tasks[taskId]
    this.modalService.openModal('descModal');
  }

  loadTasks() {
    this._taskService.getTasks().subscribe((retorno) => {
      this.tasks = retorno.map((item) => {
        return new Task(
          item.id,
          item.name,
          item.description,
          item.priority,
          item.date
        );
      });
    });
  }

  deleteTask(taskId: number) {
    this._taskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    })
  }

  ngOnInit(): void {
    this.loadTasks();

  }

  onSubmit(newTask: Task) {
    let newTaskLocal = newTask
    newTaskLocal.id = String(this.tasks.length)
    
    this._taskService.setTasks(newTaskLocal).subscribe(() => {
      this.loadTasks();
    location.reload();
    });
  }
}