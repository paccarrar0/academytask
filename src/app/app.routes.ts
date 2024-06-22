import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NewModalComponent } from './new-modal/new-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home/:userId', component: HomeComponent, children: [
    {path: 'edit/:taskId', component: EditModalComponent}
  ]},
];
