import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); // pega o token do login

  if (token) {
    // usuário está logado
    return true;
  }

  // não está logado → redireciona para login
  router.navigate(['login']);
  return false;
};
