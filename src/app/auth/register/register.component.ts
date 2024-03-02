import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import Swal from 'sweetalert2';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  user: User = {
    id: 0,
    username: '',
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'user',
    orders: []
  };

  confirmPassword!: string;

  constructor(
    private service: UserService,
    private router: Router
    ){}

  onSubmit(){
    if (!this.user.username || !this.user.name || !this.user.email || !this.user.password || !this.confirmPassword) {
      Swal.fire({
        title: "Oops...",
        text: "Please fill in all fields!",
        icon: "error"
      });
      return;
    }

    if (this.user.password === this.confirmPassword) {
      this.service.register(this.user).subscribe(
        (response: User)=> {
          Swal.fire({
            title: "Good job!",
            text: "You are register!",
            icon: "success"
          });
          this.router.navigate(['/auth/login'])
        },(err)=>{
          Swal.fire({
            title: "Oops...",
            text: "Not valid!",
            icon: "error"
          });
        }
      )
    }else{
        Swal.fire({
          title: "Oops...",
          text: "Confirm password not valid!",
          icon: "error"
        });
    }
  }
}
