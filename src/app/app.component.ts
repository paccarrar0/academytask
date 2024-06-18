import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: 
  [RouterOutlet,
   RouterModule,
   CardComponent,
   HeaderComponent,
   LoginComponent,
   CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public router: Router) {}
}
