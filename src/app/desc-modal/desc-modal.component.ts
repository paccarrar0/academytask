import { Component, Output } from '@angular/core';
import { ModalService } from '../service/modal/modal.service';

@Component({
  selector: 'app-desc-modal',
  standalone: true,
  imports: [],
  templateUrl: './desc-modal.component.html',
  styleUrl: './desc-modal.component.css'
})
export class DescModalComponent {

  constructor(private modalService: ModalService){}

  close() {
    this.modalService.close();
  }
}
