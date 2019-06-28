import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {LogisticStore} from '../../models/LogisticStore/logistic-store';
import {DriverProfile} from '../../models/User/driver-profile';
import {TmsStringContentResult} from '../../models/tms-string-content-result';
import {ReceivingBillModle} from '../../models/orderlist/orderdetail.module';

@Injectable({
  providedIn: 'root'
})
export class Basereportservice {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  /**
   *  通用的查询服务
   */
  public SearchReport(reportname: string, data: any): Observable<TmsStringContentResult> {

    const options = new HttpParams({ fromObject: data});

    return this.httpclient.get<TmsStringContentResult>(
      this.appConfiguration.Server + '/api/SearchCollect/index?reporttype=' + reportname,
      {params: options});

  }

}
