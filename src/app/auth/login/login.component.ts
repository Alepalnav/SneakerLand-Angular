import { Component } from '@angular/core';
import { LoginCredentials } from '../../interfaces/login-credentials';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginCredentials: LoginCredentials = {
    username: '',
    password:''
  }

  constructor(
    private service: UserService,
    private router: Router
  ){}

  onSubmit() {
    this.service.login(this.loginCredentials).subscribe((resp: string) => {
      localStorage.setItem('token', resp);
      Swal.fire({
        title: "Good job!",
        text: "You are logged!",
        icon: "success",
        showConfirmButton: true,
        confirmButtonText: "OK"
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/']).then(() => {
            window.location.href = window.location.href;
          });
        }
      });
    }, (err) => {
      Swal.fire({
        title: "Oops...",
        text: "Credentials wrong!",
        icon: "error"
      });
    });
  }

}
