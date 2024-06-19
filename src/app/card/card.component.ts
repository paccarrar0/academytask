import { Component, Input, Output, output } from '@angular/core';
import { EventEmitter } from 'node:stream';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() task: any;
}

