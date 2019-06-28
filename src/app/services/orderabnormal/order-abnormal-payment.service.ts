import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {TmshttpclientService} from '../tmshttpclient.service';
import {OrderAbnormalProcessRequest} from '../../models/badorder/order-abnormal-process-request';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {OrderAbnormalPaymentModel} from '../../models/badorder/order-abnormal-payment-model';
import {OrderAbnormalProcessRecordModel} from '../../models/badorder/order-abnormal-process-record';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderAbnormalPaymentService {

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
  public add(task: OrderAbnormalPaymentModel): Observable<TmsResponseModle> {
    return  this.tmshttpclientService.PostAsJson(task, '/api/OrderAbnormalPayment/add');
  }

  /**
   * 确认赔付
   * 消息ID messageid
   * 赔付时间 confirmPayDateTime
   */
  public confirmPayDate(messageid: string, confirmPayDateTime: Date): Observable<TmsResponseModle> {
    return  this.tmshttpclientService.PostAsJson({MessageId: messageid, ConfirmPayDateTime: confirmPayDateTime} ,
      '/api/OrderAbnormalPayment/ConfirmPayDate');
  }

  /**
   * 删除赔付记录
   * 消息ID messageid
   */
  public del(messageid: string): Observable<TmsResponseModle> {
    return  this.tmshttpclientService.PostAsJson({MessageId: messageid} , '/api/OrderAbnormalPayment/del');
  }

  /**
   * 赔付记录明细
   * 赔付记录 messageid
   */
  public  detail(messageid: string): Observable<OrderAbnormalPaymentModel> {
    return this.httpclient.get<OrderAbnormalPaymentModel>(
      this.appConfiguration.Server + '/api/OrderAbnormalPayment/detail?messageId=' + messageid)
      .pipe(
        tap(heroes => console.log(heroes)));

  }

}
