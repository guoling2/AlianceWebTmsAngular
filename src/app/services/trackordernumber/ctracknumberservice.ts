import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LogisticStore} from '../../models/LogisticStore/logistic-store';
import {DriverProfile} from '../../models/User/driver-profile';
import {TrackOrderNumberEntity} from '../../models/tracknumbers/TrackOrderNumberEntity';
import {TmsResponseModle} from '../../models/tms-response.module';

@Injectable({
  providedIn: 'root'
})
export class CTracknumberservice {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  public Delete(data: Array<string>): Observable<TmsResponseModle> {

    // const options = new HttpParams({ fromObject: data});
    // const result2 = this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/logistic/QueryOrders',data.ts);
    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/TrackNumberManager/Delete', data)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  public Apply(data: any): Observable<TmsResponseModle>{

   // const options = new HttpParams({ fromObject: data});
    // const result2 = this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/logistic/QueryOrders',data.ts);
    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/TrackNumberManager/Apply', data)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   *  我申请的物流单号
   */
  public QueryByApplay(data: any): Observable<TrackOrderNumberEntity[]> {


    const options = new HttpParams({ fromObject: data});
    // const result2 = this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/logistic/QueryOrders',data.ts);
    return this.httpclient.get<TrackOrderNumberEntity[]>(this.appConfiguration.Server + '/api/TrackNumberManager/QueryByApplay', {params: data})
      .pipe(
        tap(heroes => console.log(heroes)));


  }

}
