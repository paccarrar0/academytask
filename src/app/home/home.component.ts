import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../service/task/task.service';
import { Task } from '../class/task/task';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { NewModalComponent} from '../new-modal/new-modal.component'
import { DescModalComponent } from '../desc-modal/desc-modal.component';
import { ModalService } from '../service/modal/modal.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, NewModalComponent, DescModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private _taskService: TaskService,
    private modalService: ModalService
  ) {}
  
  public tasks!: Task[];
  private name!: string;
  private description!: string;
  private priority!: string;
  private date!: string;

  newTask: Task = new Task('', this.name, this.description, this.priority, this.date);

  openNewModal() {
    this.modalService.openModal('newModal');
  }

  openDescModal() {
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

  ngOnInit(): void {
    this.loadTasks();
  }

  onSubmit() {
    console.log("Enviado")
    this._taskService.setTasks(this.newTask).subscribe(() => {
      this.loadTasks();
      this.newTask = new Task('', '', '', '', '');
    location.reload();
    });
  }
}