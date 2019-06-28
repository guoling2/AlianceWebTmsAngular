import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LogisticStore} from '../../models/LogisticStore/logistic-store';
import {TmsResponseModle} from '../../models/tms-response.module';
import {TmshttpclientService} from '../tmshttpclient.service';
import {UserStoreActionRequest} from '../../models/User/user-store-action-request';
import {EmitService} from '../../help/emit-service';

@Injectable({
  providedIn: 'root'
})
export class LogisticStoreAuthorizeServiceService {

  constructor(private appConfiguration: AppConfiguration, private  httpclient: HttpClient, private tmshttpclientService: TmshttpclientService) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  /**
   * 删除用户持有的网点
   */
  public delauthorstore(userStoreActionRequest: UserStoreActionRequest): Observable<TmsResponseModle> {

    return  this.tmshttpclientService.PostAsJson(userStoreActionRequest, '/api/LogisticStoreAuthorize/del');
  }

  /**
   * 添加用户
   */
  public adduthorstore(userStoreActionRequest: UserStoreActionRequest): Observable<TmsResponseModle> {

    return  this.tmshttpclientService.PostAsJson(userStoreActionRequest, '/api/LogisticStoreAuthorize/add');
  }

  public  ByUserId(userId: string): Observable<LogisticStore[]> {
    return this.httpclient.get<LogisticStore[]>(this.appConfiguration.Server + '/api/LogisticStoreAuthorize/ByUserId?userId=' + userId)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   *  我的网点列表
   */
  public MyStores(): Observable<LogisticStore[]> {



    // const result2 = this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/logistic/QueryOrders',data.ts);
    return this.httpclient.get<LogisticStore[]>(this.appConfiguration.Server + '/api/LogisticStoreAuthorize/MyStores')
      .pipe(
        tap(heroes => console.log(heroes)));


  }

}
