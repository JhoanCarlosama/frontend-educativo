import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']).then();
      return false;
    }
    let role = route.data['role'] as string;
    console.log('rol guard: ', role);
    if(this.authService.hasRole(role)) {
      return true;
    }

    this.router.navigate(['/profesores']).then();
    return false;
  }

}
