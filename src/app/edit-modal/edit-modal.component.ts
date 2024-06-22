import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../service/task/task.service';
import { CommonModule } from '@angular/common';
import { Task } from '../class/task/task';
import { ActivatedRoute, Router } from '@angular/router';

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

  public userId!: string;
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

    this.route.params.subscribe((params: any) => {
      //this.userId = params['userId'];
      this.taskId = params['taskId'];
    
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
    console.log(this.router.routerState)
    this.showModal = false;
    this.router.navigate(['/home', this.userId]).then(() => location.reload());
  }

  onSubmit() {
    this.updatedTask = new Task(
      this.name,
      this.description,
      this.priority,
      this.date,
      this.taskId
    );
    this.taskService
      .updateTask(this.taskId, this.updatedTask)
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
          this.name,
          this.description,
          this.priority,
          this.date,
          task.id
        );
      }
    });
  }
}
