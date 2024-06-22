import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, RouterOutlet],

  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
