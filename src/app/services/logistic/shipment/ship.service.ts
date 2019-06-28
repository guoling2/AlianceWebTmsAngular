import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {TmsResponseModle} from '../../../models/tms-response.module';
import {ReceivingBillModle} from '../../../models/orderlist/orderdetail.module';
import {AppConfiguration} from '../../../auth/config/app-configuration';

@Injectable({
  providedIn: 'root',
})
export class ShipService {

  constructor(private appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }


  /**
   *  网点查询已经接单的货源
   */
  public searchReceiveOrder(data: any): Observable<object[]> {

    const options = new HttpParams({ fromObject: data});

    return this.httpclient.get<object[]>(this.appConfiguration.Server + '/api/ShipmentTransport/searchReceiveOrder', {params: options})
      .pipe(
        tap(heroes => console.log(heroes)));


  }

  /**
   * 委派司机进行任务
   */
  public updateorderstatued(data: any): Observable<TmsResponseModle> {

    const options = new HttpParams({ fromObject: data});

    return this.httpclient.post<TmsResponseModle>(
      this.appConfiguration.Server + '/api/shipmentTransport/updatestatued', options)
      .pipe(
        tap(response => console.log(response.Info)));
  }

  /**
   * 委派司机进行任务
   */
  public plandriver(data: any): Observable<TmsResponseModle> {

    const options = new HttpParams({ fromObject: data});

    return this.httpclient.post<TmsResponseModle>(
      this.appConfiguration.Server + '/api/shipmentPlan/open', options)
      .pipe(
        tap(response => console.log(response.Info)));
  }


}

