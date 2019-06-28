
import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {tap} from 'rxjs/operators';
import {LogisticStoreEntity} from '../../models/base/logistic-store-entity';

@Injectable({
  providedIn: 'root'
})
export class LogisticstoreService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }
  /**
   * 删除
   */
  public Delete(data: LogisticStoreEntity): Observable<TmsResponseModle> {

    // const options = new HttpParams({ fromObject: data});
    // const result2 = this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/logistic/QueryOrders',data.ts);
    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/LogisticStore/Delete', data)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 新增
   */
  public  Insert(data: LogisticStoreEntity): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/LogisticStore/Insert', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 修改
   */
  public  Update(data: LogisticStoreEntity): Observable<TmsResponseModle> {

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.httpclient.post<TmsResponseModle>(this.appConfiguration.Server + '/api/LogisticStore/Update', JSON.stringify(data), {headers})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 明细
   */
  public  Detail(Id: string ): Observable<LogisticStoreEntity> {
    return this.httpclient.get<LogisticStoreEntity>(this.appConfiguration.Server + '/api/LogisticStore/Detail?Id=' + Id)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 查询
   */
  public Search(data: any): Observable<LogisticStoreEntity[]> {

    const options = new HttpParams({ fromString: data});

    return this.httpclient.get<LogisticStoreEntity[]>(this.appConfiguration.Server + '/api/LogisticStore/Search', {params: data})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
}
