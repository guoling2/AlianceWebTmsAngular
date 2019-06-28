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
export class Wxorderserviceservice {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  /**
   *  我的微信客户下的订单查询
   */
  public MyOrder(data: any): Observable<TmsStringContentResult> {

    const options = new HttpParams({ fromObject: data});
    // /weixin/WxOrder/WxOrderListSearch
    // const result2 = this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/logistic/QueryOrders',data.ts);
    return this.httpclient.get<TmsStringContentResult>(this.appConfiguration.Server + '/api/weixin/WxOrder/WxOrderListSearch', {params: options})
      .pipe(
        tap(heroes => console.log(heroes)));
    // return this.httpclient.get(this.appConfiguration.Server + '/api/weixin/WxOrder/WxOrderListSearch', {params: options})
    //   .pipe(
    //    map((res: Response) => {
    //
    //      try {
    //        const jamel = JSON.parse(res.toString());
    //        return <TmsStringContentResult>(jamel);
    //      } catch (e) {
    //        return new TmsStringContentResult();
    //      }
    //    })
    //    );

  }

}
