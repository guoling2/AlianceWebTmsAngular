import {APP_INITIALIZER, NgModule} from '@angular/core';
import {OidcConfigService, OidcSecurityService, OpenIDImplicitFlowConfiguration, AuthWellKnownEndpoints} from 'angular-auth-oidc-client';
import {AuthModule } from 'angular-auth-oidc-client';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';
import {AppConfiguration} from './config/app-configuration';


/** Http interceptor providers in outside-in shipment */




@NgModule({
  imports: [
    AuthModule.forRoot(),
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  providers: [

    AppConfiguration
  ]
})
export class TmsAuthModule {
}
