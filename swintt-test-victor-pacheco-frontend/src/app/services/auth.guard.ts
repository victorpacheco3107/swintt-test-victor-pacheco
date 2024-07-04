import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

import {AuthorizationService} from "./authorization.service";

export const AuthGuardLogged: CanActivateFn = (route, state) => {
  const authorizationService = inject(AuthorizationService);
  const router = inject(Router);
  return authorizationService.isAuthenticated()
    .then(isAuthenticate => {
      if(!isAuthenticate){
        router.navigate(['login']);
        return false;
      }
      return isAuthenticate;
    })
    .catch(error => {
      router.navigate(['login']);
      return false;
    });
  return true;
};

export const AuthGuardNotLogged: CanActivateFn = (route, state) => {
  const authorizationService = inject(AuthorizationService);
  const router = inject(Router);
  return authorizationService.isAuthenticated()
    .then(isAuthenticate => {
      if(isAuthenticate){
        router.navigate(['/my-notes']);
        return false;
      }
      return true;
    })
    .catch(error => {
      console.log('En AuthGuardNotLogged.isAuthenticate -> error')
      console.log(error)
      // router.navigate(['login']);
      // Este guard es solo para las páginas de login, register, etc.
      // Si esto falla no se puede redirigir al login ya que se llamaría este mismo guard
      // y se podría crear un bule, por eso se retorna true y se deja al usuario ingresar
      // a la página de login o a la que este intentando ingresar
      return true;
    });
};
