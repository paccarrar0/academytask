import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  constructor(){}

  @Input() task: any;

  @Output() openNewModal: EventEmitter<any> = new EventEmitter<any>();

  @Output() deleteTask: EventEmitter<any> = new EventEmitter<any>();

  openModal(taskId: number) {
    this.openNewModal.emit(taskId);
  }

  deleteCard(taskId: number) {
    this.deleteTask.emit(taskId)
  }
}

