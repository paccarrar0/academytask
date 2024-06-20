import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new Subject<boolean>();
  modalState$ = this.modalState.asObservable();

  open() {
    console.log("Deu boa")
    this.modalState.next(true);
  }

  close() {
    console.log("Fechou de boa")
    this.modalState.next(false);
  }
}