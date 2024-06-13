import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

export const jwtGuard: CanMatchFn = (route, segments) => {

  const userService = inject(UserService);
  const router = inject(Router);

  // Verifica si el usuario esta autenticado y obtiene el rol
  const isLoggedIn = userService.getCurrentUser()!=null;

  if(isLoggedIn){
    return true;
  }else{
    Swal.fire({
      title: "Not Authenticated",
      text: "Please log in to access this page",
      icon: "info",
      confirmButtonColor: "#FFC107"
    });
    return router.createUrlTree(['/auth/login']);
  }

};
