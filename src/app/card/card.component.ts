import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { DatePipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, DatePipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  constructor(private router: Router) {}

  @Input() userId!: string;

  @Input() task: any;

  @Output() openNewModal: EventEmitter<any> = new EventEmitter<any>();

  @Output() deleteTask: EventEmitter<any> = new EventEmitter<any>();

  @Output() _openEditModal: EventEmitter<any> = new EventEmitter<any>();

  openEditModal(taskId: any) {
    this.router.navigate([`/home/${this.userId}/edit/${taskId}`]);
  }

  openModal(taskId: string) {
    this.openNewModal.emit(taskId);
  }

  deleteCard(taskId: number) {
    this.deleteTask.emit(taskId);
  }
}
