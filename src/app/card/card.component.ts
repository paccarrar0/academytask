import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { DatePipe } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, DatePipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  @Input() task: any;

  @Output() openNewModal: EventEmitter<any> = new EventEmitter<any>();

  @Output() deleteTask: EventEmitter<any> = new EventEmitter<any>();

  @Output() _openEditModal: EventEmitter<any> = new EventEmitter<any>();

  openEditModal(taskId: any) {
    this.router.navigate(['home/edit', taskId]);
  }

  openModal(taskId: number) {
    this.openNewModal.emit(taskId);
  }

  deleteCard(taskId: number) {
    this.deleteTask.emit(taskId);
  }
}
