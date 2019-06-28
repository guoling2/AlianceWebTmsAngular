import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorizationResult, AuthorizationState, OidcSecurityService} from 'angular-auth-oidc-client';

import {filter, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TmsAuthServiceService} from '../../tms-auth-service.service';


@Component({
  selector: 'app-call-back',
  templateUrl: './call-back.component.html',
  styleUrls: ['./call-back.component.css']
})
export class CallBackComponent implements OnInit, OnDestroy {

  checksession: boolean;

  constructor(private  tmsAuthServiceService: TmsAuthServiceService, public oidcSecurityService: OidcSecurityService, private  router: Router) {

      if (this.oidcSecurityService.moduleSetup) {
        this.doCallbackLogicIfRequired();
      } else {
        this.oidcSecurityService.onModuleSetup.subscribe(() => {
          this.doCallbackLogicIfRequired();
        });
      }

    this.oidcSecurityService.onCheckSessionChanged.subscribe(
      (checksession: boolean) => {
        console.log('...recieved a check session event');
        this.checksession = checksession;
        this.refreshSession();
      });

    this.oidcSecurityService.onAuthorizationResult.subscribe(
      (authorizationResult: AuthorizationResult) => {
        this.onAuthorizationResultComplete(authorizationResult);
      });

    this.isAuthorizedSubscription = this.oidcSecurityService.getIsAuthorized().subscribe(
      (isAuthorized: boolean) => {
        this.isAuthorized = isAuthorized;
      });
  }
  isAuthorized: boolean;
  isAuthorizedSubscription: any;

  private doCallbackLogicIfRequired(): void {
    if (window.location.hash) {

      console.log(window.location.hash);
      this.oidcSecurityService.authorizedCallback();
    }
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {

    // console.log('call-back.component.ts ngOnDestroy');
    // if (this.isAuthorizedSubscription) {
    //   this.isAuthorizedSubscription.unsubscribe();
    // }
    // this.oidcSecurityService.onModuleSetup.unsubscribe();
    // this.oidcSecurityService.onCheckSessionChanged.unsubscribe();
    // this.oidcSecurityService.onAuthorizationResult.unsubscribe();
  }


  refreshSession(): void {
    this.tmsAuthServiceService.revokeToken();
    // Stores the attempted URL for redirecting.
    this.tmsAuthServiceService.setRedirectUrl(this.router.url);
    this.oidcSecurityService.authorize();
  }

  private onAuthorizationResultComplete(authorizationResult: AuthorizationResult) {
    console.log('Auth result received:' + authorizationResult);
    console.log(authorizationResult);

    switch (authorizationResult.authorizationState) {
      case AuthorizationState.authorized:
        // Gets the redirect URL from authentication service.
        // If no redirect has been set, uses the default.
        const redirectUrl: string = this.tmsAuthServiceService.getRedirectUrl()
          ? this.tmsAuthServiceService.getRedirectUrl()
          : '/biz/home';
        // Redirects the user.

        console.log(redirectUrl);
        this.router.navigate([redirectUrl]);
        break;
      case AuthorizationState.forbidden:
        this.router.navigate(['/forbidden']);
        break;
      case AuthorizationState.unauthorized:
        this.router.navigate(['/unauthorized']);
        break;
      default:
        this.router.navigate(['/biz/home']);
    }
    // /*if (authorizationResult.authorizationState = AuthorizationState.unauthorized) {
    //   if (window.parent) {
    //     // sent from the child iframe, for example the silent renew
    //     window.parent.location.href = '/unauthorized';
    //   } else {
    //     // sent from the main window
    //     window.location.href = '/unauthorized';
    //   }
    // }*/
  }
}
