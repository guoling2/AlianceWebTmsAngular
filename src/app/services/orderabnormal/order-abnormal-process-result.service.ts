import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {TmshttpclientService} from '../tmshttpclient.service';
import {Observable} from 'rxjs';
import {OrderAbnormalPaymentModel} from '../../models/badorder/order-abnormal-payment-model';
import {tap} from 'rxjs/operators';
import {OrderAbnormalProcessResultModel} from '../../models/badorder/order-abnormal-process-result-model';
import {TmsResponseModle} from '../../models/tms-response.module';
import {OrderAbnormalProcessResultRequest} from '../../models/badorder/order-abnormal-process-result-request';

@Injectable({
  providedIn: 'root'
})
export class OrderAbnormalProcessResultService {

  constructor( private readonly appConfiguration: AppConfiguration,
               private  httpclient: HttpClient,
               private tmshttpclientService: TmshttpclientService) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:59471';
    }
    //  this.appConfiguration.Server = 'http://localhost:59471';
  }


  /**
   *  添加一条赔付记录
   */
  public add(task: OrderAbnormalProcessResultRequest): Observable<TmsResponseModle> {
    return  this.tmshttpclientService.PostAsJson(task, '/api/OrderAbnormalProcessResult/add');
  }

  /**
   * 结案记录
   * 消息ID messageid
   */
  public  detail(messageid: string): Observable<OrderAbnormalProcessResultModel> {
    return this.httpclient.get<OrderAbnormalProcessResultModel>(
      this.appConfiguration.Server + '/api/OrderAbnormalProcessResult/detail?messageId=' + messageid)
      .pipe(
        tap(heroes => console.log(heroes)));

  }
}
