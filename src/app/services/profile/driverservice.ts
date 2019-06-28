import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LogisticStore} from '../../models/LogisticStore/logistic-store';
import {DriverProfile} from '../../models/User/driver-profile';

@Injectable({
  providedIn: 'root'
})
export class Driverservice {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  /**
   *  我的网点列表
   */
  public MyDrivers(): Observable<DriverProfile[]> {



    // const result2 = this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/logistic/QueryOrders',data.ts);
    return this.httpclient.get<DriverProfile[]>(this.appConfiguration.Server + '/api/MyDriver/List')
      .pipe(
        tap(heroes => console.log(heroes)));


  }

}
