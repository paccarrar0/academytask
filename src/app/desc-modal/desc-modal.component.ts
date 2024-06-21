import { Component, OnDestroy, OnInit, Input} from '@angular/core';
import { ModalService } from '../service/modal/modal.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-desc-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './desc-modal.component.html',
  styleUrl: './desc-modal.component.css'
})
export class DescModalComponent implements OnInit, OnDestroy {
  @Input() task: any;
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
