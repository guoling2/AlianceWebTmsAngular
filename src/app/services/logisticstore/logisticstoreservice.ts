import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LogisticStore} from '../../models/LogisticStore/logistic-store';

@Injectable({
  providedIn: 'root'
})
export class LogisticStoreServiceService {

  constructor(private appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  /**
   *  网点查询
   */
  public StoreQuery(): Observable<LogisticStore[]> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // const result2 = this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/logistic/QueryOrders',data.ts);
    return this.httpclient.get<LogisticStore[]>(this.appConfiguration.Server + '/api/LogisticStore/query')
      .pipe(
        tap(heroes => console.log(heroes)));


  }

}
