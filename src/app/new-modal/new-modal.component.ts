import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../service/modal/modal.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-modal.component.html',
  styleUrl: './new-modal.component.css'
})

export class NewModalComponent implements OnInit, OnDestroy {
  @Output() submitTask: EventEmitter<any> = new EventEmitter<any>

  onSubmit() {
    this.submitTask.emit();
  }

  @Input() modalId!: string;
  showModal = false;
  private modalSubscription!: Subscription;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalSubscription = this.modalService.getModalEvents().subscribe(event => {
      if (event.id === this.modalId) {
        this.showModal = event.action === 'open';
      }
    });
  }

  ngOnDestroy() {
    this.modalSubscription.unsubscribe();
  }

  close() {
    this.modalService.closeModal(this.modalId);
  }
}
