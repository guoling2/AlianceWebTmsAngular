import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../../auth/config/app-configuration';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {TmsResponseModle} from '../../../models/tms-response.module';
import {LogisticStoreEntity} from '../../../models/base/logistic-store-entity';

@Injectable({
  providedIn: 'root'
})
export class XiecheService {

  constructor(private appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }
  /**
   *  查询已经委派给司机的任务
   */
  public Scan(XieCheCode: string, ActionStoreId: string): Observable<TmsResponseModle> {

    return this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/ShipmentXieche/Scan?XieCheCode=' + XieCheCode + '&ActionStoreId=' + ActionStoreId)
      .pipe(
        tap(heroes => console.log(heroes)));

  }
  public  XieChe(data: object): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/ShipmentXieche/XieChe', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
}
