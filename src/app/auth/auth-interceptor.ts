import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { OidcSecurityService} from 'angular-auth-oidc-client';
import {ErrorObserver, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';




/** 授权head标记 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private oidcSecurityService: OidcSecurityService;

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestToForward = req;

    if ( this.oidcSecurityService === undefined ) {
      this.oidcSecurityService = this.injector.get(OidcSecurityService);
    }
    if ( this.oidcSecurityService !== undefined ) {
      const token = this.oidcSecurityService.getToken();
      if ( token !== '' ) {
        const tokenValue = 'Bearer ' + token;

        // console.log(tokenValue);


        // req.s
        requestToForward = req.clone({setHeaders: {'Authorization': tokenValue, 'Sps': 'ag2'}});
      }
    } else {
      console.log('OidcSecurityService undefined: NO auth header!');
    }

    return next.handle(requestToForward).pipe(catchError((error, caught) => {
      //intercept the respons error and displace it to the console
      console.log(error);
      this.handleAuthError(error);
      return of(error);
    }) as any);

    // return next.handle(requestToForward).pipe(
    //   catchError(err => {

    //     const  errr=err as HttpErrorResponse;
    //     throw new Error('error in source. Details: '+errr);
    //   }));
  }


  /**
   * manage errors
   * @param err
   * @returns {any}
   */
  private handleAuthError(err: HttpErrorResponse): Observable<any> {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${err.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    window.alert(errorMessage);
    // handle your auth error or rethrow
    if (err.status === 401) {
      //navigate /delete cookies or whatever
      console.log('handled error ' + err);
     // this.router.navigate([`/login`]);
// tslint:disable-next-line: max-line-length
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message);
    }
    throw err;
  }
}
