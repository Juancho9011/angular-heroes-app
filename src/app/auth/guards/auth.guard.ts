import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, RouterStateSnapshot, Route, UrlSegment, Router } from '@angular/router';
import { Observable, pipe, tap } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanMatch {

  constructor(private authService: AuthService, private route: Router) { }

  checkAutenticationStatus(): boolean | Observable<boolean> {

    return this.authService.checkAutentication().pipe(
      tap(authenticated => {
        if (!authenticated) this.route.navigate(['./auth/login'])
      })
    )

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {


    return this.checkAutenticationStatus()
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAutenticationStatus()
  }

}
