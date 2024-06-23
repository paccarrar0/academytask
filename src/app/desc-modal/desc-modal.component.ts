import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ModalService } from '../service/modal/modal.service';
import { TaskService } from '../service/task/task.service';
import { Subscription, from } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Task } from '../class/task/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-desc-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './desc-modal.component.html',
  styleUrl: './desc-modal.component.css',
})
export class DescModalComponent implements OnInit, OnDestroy {
  @Input() task: any;
  @Input() modalId!: string;

  showModal = false;
  public taskId!: string;
  public tasks!: Task[];
  public description!: string;
  private modalSubscription!: Subscription;

  constructor(private modalService: ModalService, private taskService: TaskService) {}

  onSubmit() {
    const task = this.tasks.find((t) => t.id == this.taskId);
    if(task) {

      console.log("Tarefa encontrada")

      let dataToUpdate: Partial<Task> = {description: this.description};

      this.taskService.patchTask(this.taskId, dataToUpdate).subscribe(
        updatedTask => {
          updatedTask.description = this.description;
          console.log(`Tarefa ${this.taskId} autualizada com sucesso.`, updatedTask)
          this.loadTasks();
          location.reload();
        },
        error => {
          console.log(`Erro ao atualizar a tarefa ${this.taskId}`, error)
        }
      )
    }
  }

  ngOnInit() {   
    this.loadTasks();

    this.modalSubscription = this.modalService
      .getModalEvents()
      .subscribe((event) => {
        if (event.id === this.modalId) {
          this.showModal = event.action === 'open';
        }
      });
  }
  
  openDescModal(taskId: string) {
    const task = this.tasks.find((t) => t.id == taskId);
    if(task){
      this.taskId = task.id;
      this.description = task.description;
      this.modalService.openModal('descModal');
    }
    
}

  loadTasks() {
    this.taskService.getTasks().subscribe((retorno) => {
      this.tasks = retorno.map((item) => {
        return new Task(
          item.name,
          item.description,
          item.priority,
          item.date,
          item.id
        );
      });
    })
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  close() {
    this.modalService.closeModal(this.modalId);
  }
}
