import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, RouterStateSnapshot, Route, UrlSegment, Router } from '@angular/router';
import { map, Observable, pipe, tap } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate, CanMatch {

  constructor(private authService: AuthService, private route: Router) { }

  checkAutenticationStatus(): boolean | Observable<boolean> {

    return this.authService.checkAutentication().pipe(
      tap(authenticated => {
        if (authenticated) {
          this.route.navigate(['./'])
        }
      }),
      map((isAuth) => {
        console.log({ isAuth });

        return !isAuth
      })// invertido para que funcione
    )

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {

    console.log("canActivate");

    console.log({ route, state });

    return this.checkAutenticationStatus()
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAutenticationStatus()
  }

}
