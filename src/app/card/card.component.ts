import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  constructor(){}

  @Input() task: any;

  @Output() openParentModal: EventEmitter<any> = new EventEmitter<any>();

  openModal() {
    this.openParentModal.emit(true);
    console.log(false)
  }
}

