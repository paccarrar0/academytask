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

  @Input() task: any;

  @Output() openNewModal: EventEmitter<any> = new EventEmitter<any>();

  @Output() deleteTask: EventEmitter<any> = new EventEmitter<any>();

  @Output() _openEditModal: EventEmitter<any> = new EventEmitter<any>();

  openEditModal(taskId: any) {
    this.router.navigate(['home/edit', taskId]);
  }

  openModal(taskId: string) {
    this.openNewModal.emit(taskId);
  }

  deleteCard(taskId: number) {
    this.deleteTask.emit(taskId);
  }

  getWeatherIcon(weatherType: string): string {
    switch (weatherType) {
      case 'Clear':
        return '../../assets/icons/brightness-high.svg';
      case 'Clouds':
        return '../../assets/icons/cloud.svg';
      case 'Rain':
        return '../../assets/icons/cloud-drizzle.svg';
      case 'Thunderstorm':
        return '../../assets/icons/cloud-lightning-rain.svg';
      case 'Snow':
        return '../../assets/icons/cloud-snow.svg';
      case 'Mist':
        return '../../assets/icons/weather_fog_icon_136028.svg';
      default:
        return '../../assets/icons/hourglass-split.svg';
    }
  }
}
