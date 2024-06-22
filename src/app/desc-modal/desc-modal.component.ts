import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ModalService } from '../service/modal/modal.service';
import { TaskService } from '../service/task/task.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Task } from '../class/task/task';

@Component({
  selector: 'app-desc-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './desc-modal.component.html',
  styleUrl: './desc-modal.component.css',
})
export class DescModalComponent implements OnInit, OnDestroy {
  @Input() task: any;
  @Input() modalId!: string;

  showModal = false;
  public tasks!: Task[];
  public description!: string;
  private modalSubscription!: Subscription;

  constructor(private modalService: ModalService, private taskService: TaskService) {}

  ngOnInit() {   
    this.modalSubscription = this.modalService
      .getModalEvents()
      .subscribe((event) => {
        if (event.id === this.modalId) {
          this.showModal = event.action === 'open';
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

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  close() {
    this.modalService.closeModal(this.modalId);
  }
}
