import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {TmsStringContentResult} from '../../models/tms-string-content-result';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {OrderAbnormalMessageViewModel} from '../../models/badorder/OrderAbnormalMessageViewModel';
import {TmsResponseModle} from '../../models/tms-response.module';
import {TaskProcessRequest} from '../../models/badorder/task-process-request';
import {TmshttpclientService} from '../tmshttpclient.service';

@Injectable({
  providedIn: 'root'
})
export class OrderAbnormalServiceService {

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
   * 修改问题分类
   * @param messageId 消息ID
   * @param claim 分类
   */
  public Motifyclaim(messageId: string, claim: string): Observable<TmsResponseModle> {

   return   this.tmshttpclientService.PostAsJson({MessageId: messageId, Claim: claim}, '/api/OrderAbnormal/motifyclaim');
    // return  this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/OrderAbnormal/motifyclaim', x, {} )
    //   .pipe(
    //     tap(heroes => console.log(heroes)));
  }
  /**
   *  异常处理
   */
  public Process(task: TaskProcessRequest): Observable<TmsResponseModle> {

    return  this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/OrderAbnormal/process', task)
      .pipe(
        tap(heroes => console.log(heroes)));

  }
  /**
   *  异常信息
   */
  public Detail(messageid: string): Observable<OrderAbnormalMessageViewModel> {

    return  this.httpclient.get<OrderAbnormalMessageViewModel>(this.appConfiguration.Server + '/api/OrderAbnormal/Detail?messageid=' + messageid)
      .pipe(
        tap(heroes => console.log(heroes)));

  }
}
