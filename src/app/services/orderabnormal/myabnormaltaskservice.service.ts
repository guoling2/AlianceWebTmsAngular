import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbnormalTipViewModel} from '../../models/badorder/abnormal-tip-view-model';
import {tap} from 'rxjs/operators';
import {TmsResponseModle} from '../../models/tms-response.module';
@Injectable({
  providedIn: 'root'
})
export class MyabnormaltaskserviceService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {
    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:59471';
    }
  }


  /**
   *  我的任务列表
   */
  public Query(data: any): Observable<AbnormalTipViewModel[]> {

    const options = new HttpParams({ fromObject: data});

    return this.httpclient.get<AbnormalTipViewModel[]>(this.appConfiguration.Server + '/api/OrderAbnormal/mytasklist', {params: options})
      .pipe(
        tap(heroes => console.log(heroes)));
  }
}
