import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {TmshttpclientService} from '../tmshttpclient.service';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {tap} from 'rxjs/operators';
import {OrderAbnormalProcessRequest} from '../../models/badorder/order-abnormal-process-request';
import {OrderAbnormalProcessRecordModel} from '../../models/badorder/order-abnormal-process-record';

@Injectable({
  providedIn: 'root'
})
export class OrderAbnormalProcessService {

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
   *  添加处理记录
   */
  public add(task: OrderAbnormalProcessRequest): Observable<TmsResponseModle> {
    return  this.tmshttpclientService.PostAsJson(task, '/api/OrderAbnormalProcess/AddProcess');
  }

  /**
   * 记录s
   * 消息ID messageid
   */
  public recordlist(messageid: string): Observable<OrderAbnormalProcessRecordModel[]> {
    // tslint:disable-next-line:max-line-length
    return this.httpclient.get<OrderAbnormalProcessRecordModel[]>(this.appConfiguration.Server + '/api/OrderAbnormalProcess/recordlist?messageId=' + messageid)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
}
