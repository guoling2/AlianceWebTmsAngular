import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {LogisticStore} from '../../models/LogisticStore/logistic-store';
import {tap} from 'rxjs/operators';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpParams} from '@angular/common/http';
import {EmplayeeUser} from '../../models/User/emplayee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeUserService {

  constructor(private appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }
  /**
   *  员工查询
   */
  public Detail(uid: string): Observable<EmplayeeUser> {



    // const result2 = this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/logistic/QueryOrders',data.ts);
    return this.httpclient.get<EmplayeeUser>(this.appConfiguration.Server + '/api/Employees/Detail/' + uid)
      .pipe(
        tap(heroes => console.log(heroes)));


  }
  /**
   *  员工查询
   */
  public Query(data: any): Observable<EmplayeeUser[]> {

    const options = new HttpParams({ fromObject: data});

    // const result2 = this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/logistic/QueryOrders',data.ts);
    return this.httpclient.get<EmplayeeUser[]>(this.appConfiguration.Server + '/api/Employees/List', {params: options})
      .pipe(
        tap(heroes => console.log(heroes)));


  }
}
