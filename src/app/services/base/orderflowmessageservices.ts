import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {LogisticStore} from '../../models/LogisticStore/logistic-store';
import {DriverProfile} from '../../models/User/driver-profile';
import {TmsStringContentResult} from '../../models/tms-string-content-result';
import {ReceivingBillModle} from '../../models/orderlist/orderdetail.module';
import {OrderFlowMessageEntity} from '../../models/order-flow-message';

@Injectable({
  providedIn: 'root'
})
export class OrderFlowMessageServices {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  /**
   *  查询物流节点信息
   */
  public Search(trackId: string): Observable<OrderFlowMessageEntity[]> {
    return this.httpclient.get<OrderFlowMessageEntity[]>(
      this.appConfiguration.Server + '/api/OrderFlowMessage/Search?tackId=' + trackId);


  }

}
