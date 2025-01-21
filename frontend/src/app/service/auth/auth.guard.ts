import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  if (!authService.isAuthenticated()) {
    localStorage.removeItem('token');
    return router.createUrlTree(['/login']);
  }
  return true;
};
