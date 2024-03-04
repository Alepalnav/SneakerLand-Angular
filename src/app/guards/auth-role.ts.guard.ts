import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

export const authRoleTsGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  // Verifica si el usuario esta autenticado y obtiene el rol
  const isLoggedIn = userService.getCurrentUser()!=null;
  const userRole = userService.getUserRole();


  if (isLoggedIn && (userRole === 'admin' || userRole === 'user')) {
    return true;
  } else if (isLoggedIn && userRole !== 'admin') {
    Swal.fire({
      title: "Access Denied",
      text: "You do not have permission to access this page.",
      icon: "error",
      confirmButtonColor: "#FFC107"
    });
    return router.createUrlTree(['/']);
  } else {
    Swal.fire({
      title: "Not Authenticated",
      text: "Please log in to access this page",
      icon: "info",
      confirmButtonColor: "#FFC107"
    });
    return router.createUrlTree(['/auth/login']);
  }};

