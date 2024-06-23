import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../service/user/user.service';
import { User } from '../class/user/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  private users!: User[];

  user = {
    name: '',
    password: ''
  };

  password!: any;
  showUserError = false
  showPasswordError = false

  constructor(private userService: UserService, private router: Router){}

  get validateUser(){
    let user = this.users.find((u) => u.name == this.user.name)
    this.password = user?.password
    console.log(this.password)
    return user
  }

  get validatePassword(){
    let user = this.users.find((u) => u.name == this.user.name)
    this.password = user?.password
    return(this.password == this.user.password)
  }

  onSubmit() {
    let user = this.users.find((u) => u.name == this.user.name)
    
    if(!user){
      this.showUserError = true
      this.showPasswordError = false
    }else if(user && !this.validatePassword){
      this.showUserError = false
      this.showPasswordError = true
      console.log(this.password)
    }else if(user && this.validatePassword){
      this.showPasswordError = false;
      this.showUserError = false
      
      this.router.navigate(["/home"])
    }
  }

  ngOnInit(): void {
      this.loadUsers();
      console.log(this.users)
  }


  loadUsers(){
    this.userService.getUsers().subscribe((retorno) => {
      this.users = retorno.map((item: { name: string; password: string; id: string | undefined; }) => {
        return new User(item.name, item.password, item.id)
      })
    })
  }
}
