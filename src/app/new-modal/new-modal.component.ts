import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../service/modal/modal.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Task } from '../class/task/task';

@Component({
  selector: 'app-new-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-modal.component.html',
  styleUrl: './new-modal.component.css',
})
export class NewModalComponent implements OnInit, OnDestroy {
  @Output() submitTask: EventEmitter<any> = new EventEmitter<any>();
  @Input() modalId!: string;

  public showModal = false;
  private modalSubscription!: Subscription;

  public name!: string;
  public description!: string;
  public priority!: string;
  public date!: string;

  newTask: Task = new Task(
    '',
    this.name,
    this.description,
    this.priority,
    this.date
  );

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalSubscription = this.modalService
      .getModalEvents()
      .subscribe((event) => {
        if (event.id === this.modalId) {
          this.showModal = event.action === 'open';
        }
      });
  }

  onSubmit() {
    this.newTask = new Task(
      this.name,
      this.description,
      this.priority,
      this.date
      
    );
    this.submitTask.emit(this.newTask);
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  close() {
    this.modalService.closeModal(this.modalId);
  }
}
