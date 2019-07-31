import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {AdminModule} from './admin/admin.module';
import {TmsAuthModule} from './auth/tmsauth.module';
import {SharedModule} from './shared/shared.module';
import {EmitService} from './help/emit-service';
import { AlertDirective } from './directive/alert.directive';
import { AlerthiddenDirective } from './directive/alerthidden.directive';
import {DialogservicesService} from './help/dialogservices.service';
import {RouteReuseStrategy} from '@angular/router';
import {CustomerModuleModule} from './pages/customer/customer.module';
import {OidcSecurityService, OpenIDImplicitFlowConfiguration, AuthWellKnownEndpoints, OidcConfigService} from 'angular-auth-oidc-client';

import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth/auth-interceptor';
import {AppConfiguration} from './auth/config/app-configuration';
import {CommonbizmoduleModule} from './pages/common/commonbizmodule.module';
import {AppbuinessModule} from './appbuiness.module';
import {MulipageReuseStrategy} from './mulipage-reuse-strategy';



export const HttpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];


export function loadConfig(oidcConfigService: OidcConfigService) {
  console.log('APP_INITIALIZER STARTING');

  console.log(environment.production);


   //return () => oidcConfigService.load(`https://aliance.trandawl.cn/api/OidcSecurity/config`);

  if (environment.production) {


    console.log('产品版本');

    return () => oidcConfigService.load(`${window.location.origin}/api/OidcSecurity/config`);

  } else {

    console.log('开发版本');

    return () => oidcConfigService.load(`http://localhost:52631/api/OidcSecurity/config`);
  }
}


@NgModule({
  declarations: [
    AppComponent,
    AlertDirective,
    AlerthiddenDirective

  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    CustomerModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CommonbizmoduleModule,
    TmsAuthModule,
    AdminModule,
    AppbuinessModule,


  ],
  providers: [
    EmitService,
    DialogservicesService,
    OidcConfigService,
    OidcSecurityService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [OidcConfigService],
      multi: true
    },
    HttpInterceptorProviders,
  ],
  exports: [
    AlertDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private oidcConfigService: OidcConfigService,
    private appconfiguration: AppConfiguration
  ) {

    this.oidcConfigService.onConfigurationLoaded.subscribe(() => {

      if (this.oidcConfigService.clientConfiguration == null) {
        return; }

      console.log( '加载配置数据' + this.oidcConfigService.clientConfiguration);

      const  baseurl = `${window.location.origin}`;



      console.log(baseurl);

      // console.log(this.oidcConfigService.clientConfiguration.redirect_url);

      const openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();
      openIDImplicitFlowConfiguration.stsServer = this.oidcConfigService.clientConfiguration.stsServer;
      openIDImplicitFlowConfiguration.redirect_url = baseurl + this.oidcConfigService.clientConfiguration.redirect_url;
      // window.location.origin +
      // The Client MUST validate that the aud (audience) Claim contains its client_id value registered at the Issuer
      // identified by the iss (issuer) Claim as an audience.
      // The ID Token MUST be rejected if the ID Token does not list the Client as a valid audience,
      // or if it contains additional audiences not trusted by the Client.
      openIDImplicitFlowConfiguration.client_id = this.oidcConfigService.clientConfiguration.client_id;
      openIDImplicitFlowConfiguration.response_type = this.oidcConfigService.clientConfiguration.response_type;
      openIDImplicitFlowConfiguration.scope = this.oidcConfigService.clientConfiguration.scope;
      openIDImplicitFlowConfiguration.post_logout_redirect_uri = this.oidcConfigService.clientConfiguration.post_logout_redirect_uri;
      openIDImplicitFlowConfiguration.start_checksession = this.oidcConfigService.clientConfiguration.start_checksession;

      openIDImplicitFlowConfiguration.silent_renew = true;
      openIDImplicitFlowConfiguration.silent_renew_url = baseurl + '/assets/silent-renew.html';
      openIDImplicitFlowConfiguration.silent_redirect_url = baseurl + '/assets/silent-renew.html';

      openIDImplicitFlowConfiguration.post_login_route = '/biz/home'; // this.oidcConfigService.clientConfiguration.startup_route;
      // HTTP 403
      openIDImplicitFlowConfiguration.forbidden_route = this.oidcConfigService.clientConfiguration.forbidden_route;
      // HTTP 401
      openIDImplicitFlowConfiguration.unauthorized_route = this.oidcConfigService.clientConfiguration.unauthorized_route;
      openIDImplicitFlowConfiguration.log_console_warning_active = this.oidcConfigService.clientConfiguration.log_console_warning_active;
      openIDImplicitFlowConfiguration.log_console_debug_active = this.oidcConfigService.clientConfiguration.log_console_debug_active;
      // id_token C8: The iat Claim can be used to reject tokens that were issued too far away from the current time,
      // limiting the amount of time that nonces need to be stored to prevent attacks.The acceptable range is Client specific.
      openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds =
        this.oidcConfigService.clientConfiguration.max_id_token_iat_offset_allowed_in_seconds;

      const authWellKnownEndpoints = new AuthWellKnownEndpoints();
      authWellKnownEndpoints.setWellKnownEndpoints(this.oidcConfigService.wellKnownEndpoints);

      this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration, authWellKnownEndpoints);

      this.appconfiguration.Server = this.oidcConfigService.clientConfiguration.apiServer;


      openIDImplicitFlowConfiguration.log_console_debug_active = false;
      openIDImplicitFlowConfiguration.log_console_warning_active = false;

      console.log(openIDImplicitFlowConfiguration);

      console.log(authWellKnownEndpoints);
    });

    console.log('认证配置加载结束');
  }
}
