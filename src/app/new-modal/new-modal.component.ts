import { Component } from '@angular/core';
import { ModalService } from '../service/modal/modal.service';

@Component({
  selector: 'app-new-modal',
  standalone: true,
  imports: [],
  templateUrl: './new-modal.component.html',
  styleUrl: './new-modal.component.css'
})

export class NewModalComponent {
  constructor(private modalService: ModalService) {}

  close() {
    this.modalService.close();
  }
}
