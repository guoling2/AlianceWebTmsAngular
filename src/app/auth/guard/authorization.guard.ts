import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad} from '@angular/router';
import { Observable } from 'rxjs';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {map, tap} from 'rxjs/operators';
import {TmsAuthServiceService} from '../tms-auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private router: Router,
    private oidcSecurityService: OidcSecurityService,
    private authService: TmsAuthServiceService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    console.log(route + ',' + state);
    return this.checkUser(state);
  }


  private checkUser( state: RouterStateSnapshot): Observable<boolean> {

    console.log('AuthorizationGuard, canActivate');

    return this.oidcSecurityService.getIsAuthorized().pipe(
      tap((isAuthorized: boolean) => {


        console.log('AuthorizationGuard, canActivate isAuthorized: ' + isAuthorized);

        if (!isAuthorized) {


          console.log('authService.setRedirectUrl' + state.url);
          this.authService.setRedirectUrl(state.url);

          // Not signed in so redirects to unauthorized page.
        //  this.router.navigate(['/unauthorized']);


          this.router.navigate(['/unauthorized']);

          return false;
        }
      })
    );
  }
}
