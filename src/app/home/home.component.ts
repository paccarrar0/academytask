import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../service/task/task.service';
import { Task } from '../class/task/task';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { NewModalComponent} from '../new-modal/new-modal.component'
import { DescModalComponent } from '../desc-modal/desc-modal.component';
import { ModalService } from '../service/modal/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, NewModalComponent, DescModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private _taskService: TaskService,
    private modalService: ModalService
  ) {}

  isModalOpen = false;
  private modalSubscription!: Subscription;
  public tasks!: Task[];

  public value: string = "false";

  openDescModal(event: any) {
    this.value = event;
    console.log(event)
  }

  ngOnInit(): void {
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

    this.modalSubscription = this.modalService.modalState$.subscribe(
      (isOpen) => (this.isModalOpen = isOpen)
    );
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  openModal() {
    this.modalService.open();
  }

  closeModal() {
    this.modalService.close();
  }
}
