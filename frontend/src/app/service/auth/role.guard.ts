import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const expectedRoles: string[] = route.data['roles'] as string[];
  if (authService.isAuthenticated() && authService.getRoles().some((role: string) => expectedRoles.includes(role))) {
    return true;
  }
  return router.createUrlTree(['/home']);
}
