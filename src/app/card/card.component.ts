import { Component, NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  public name: string = "Testando a interpolação no componente."
  public email!: string;
}
