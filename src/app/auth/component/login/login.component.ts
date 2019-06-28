import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {filter, map, take} from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private  router: Router, private oidcSecurityService: OidcSecurityService) {

    if (this.oidcSecurityService.moduleSetup) {

      this.oidcSecurityService.authorize();
     // this.doCallbackLogicIfRequired();
    } else {
      this.oidcSecurityService.onModuleSetup.subscribe(() => {


        this.oidcSecurityService.authorize();
      //  this.doCallbackLogicIfRequired();
      });
    }

  }
  // private doCallbackLogicIfRequired(): void {
  //   if (window.location.hash) {
  //
  //     console.log(window.location.hash);
  //     this.oidcSecurityService.authorizedCallback();
  //   }
  // }

  ngOnInit() {

    console.log('登录状态' + this.oidcSecurityService.getIsAuthorized());


    // this.router.navigate(['/home']);

  }

}
