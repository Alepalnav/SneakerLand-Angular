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
    this.service.register(this.user).subscribe(
      (response: User)=> {
        Swal.fire({
          title: "Good job!",
          text: "You are register!",
          icon: "success"
        });
        this.router.navigate(['/auth/login'])
      }
    )
  }

}
