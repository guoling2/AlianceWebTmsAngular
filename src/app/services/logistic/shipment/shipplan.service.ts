import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {TmsResponseModle} from '../../../models/tms-response.module';
import {ReceivingBillModle} from '../../../models/orderlist/orderdetail.module';
import {AppConfiguration} from '../../../auth/config/app-configuration';
import {DriverShipmentPlanCancleRequest} from '../../../models/shipment/driver-shipment-plan-cancle-request';

@Injectable({
  providedIn: 'root',
})
export class ShipplanService {

  constructor(private appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }


  /**
   *  查询已经委派给司机的任务
   */
  public searchplan(data: any): Observable<object[]> {

    const options = new HttpParams({ fromObject: data});

    return this.httpclient.get<object[]>(this.appConfiguration.Server + '/api/ShipmentPlan/query', {params: options})
      .pipe(
        tap(heroes => console.log(heroes)));


  }
  /**
   * 任务委派
   */
  public plancreate(data: any): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    //const options = new HttpParams({ fromObject: data}, headers:{'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(
      this.appConfiguration.Server + '/api/shipmentPlan/open',  JSON.stringify(data), {headers})
      .pipe(
        tap(response => console.log(response.Info)));
  }

  /**
   * 取消委派司机进行任务
   */
  public plancacle(data: DriverShipmentPlanCancleRequest): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(
      this.appConfiguration.Server + '/api/shipmentPlan/canclefortrack', JSON.stringify(data), {headers})
      .pipe(
        tap(response => console.log(response.Info)));
  }



}

