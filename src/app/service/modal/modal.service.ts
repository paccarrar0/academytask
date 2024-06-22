import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalSubject = new Subject<any>();

  openModal(modalId: string) {
    this.modalSubject.next({ action: 'open', id: modalId });
  }

  closeModal(modalId: string) {
    this.modalSubject.next({ action: 'close', id: modalId });
  }

  getModalEvents() {
    return this.modalSubject.asObservable();
  }
}
