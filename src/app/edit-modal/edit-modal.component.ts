import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../service/task/task.service';
import { CommonModule } from '@angular/common';
import { Task } from '../class/task/task';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css',
})
export class EditModalComponent implements OnInit {
  @Output() editTask: EventEmitter<any> = new EventEmitter<any>();
  @Input() modalId!: string;

  public showModal = false;
  public taskId!: string;
  public updatedTask!: Task;
  public tasks!: Task[];

  public name!: string;
  public description!: string;
  public priority!: string;
  public date!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.taskId = params['id'];

      if (this.taskId) {
        this.showModal = true;
        this.loadTaskById(this.taskId); // Carregar tarefa específica
      }
    });
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((retorno) => {
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

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/home']).then(() => location.reload());
  }

  onSubmit() {
    this.updatedTask = new Task(
      this.taskId,
      this.name,
      this.description,
      this.priority,
      this.date
    );
    this.taskService
      .updateTask(Number(this.taskId), this.updatedTask)
      .subscribe(() => {
        this.editTask.emit(this.updatedTask);
        this.closeModal();
      });
  }

  loadTaskById(taskId: string) {
    this.taskService.getTasks().subscribe((tasks) => {
      const task = tasks.find((t) => t.id == taskId);
      if (task) {
        this.name = task.name;
        this.description = task.description;
        this.priority = task.priority;
        this.date = task.date;
        this.updatedTask = new Task(
          task.id,
          this.name,
          this.description,
          this.priority,
          this.date
        );
      }
    });
  }
}
