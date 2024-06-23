import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import { User } from '../class/user/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  formData = {
    username: '',
    password: '',
    confirmPassword: ''
  };

  private userData!: User;
  private users!: User[];

  constructor(private userService: UserService, private router: Router){}

  get passwordsMatch(): boolean {
    return this.formData.password === this.formData.confirmPassword;
  }

  get userExist(): boolean {
    const user = this.users.find((u) => u.name == this.formData.username);
    return Boolean(user)
  }

  onSubmit(): void {
    if (this.passwordsMatch && this.userExist == false) {
      this.userData = new User(this.formData.username, this.formData.password)
      this.userService.setUser(this.userData).subscribe(() => {
        this.router.navigate(['/login'])
      })

      console.log('Form submitted successfully', this.formData);
    } else if(this.passwordsMatch) {
      console.error('O usuário já existe');
    }else if(this.userExist){
      console.log("As senhas não coincidem")
    }
  }

  loadUsers(){
    this.userService.getUsers().subscribe((retorno) => {
      this.users = retorno.map((item: { name: string; password: string; id: string | undefined; }) => {
        return new User(item.name, item.password, item.id)
      })
    })
  }

  ngOnInit(): void {
    this.loadUsers();
  }
}
