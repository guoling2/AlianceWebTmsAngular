import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PageQueryResult} from '../../models/page-query-result';
import {Vehicelmodel} from '../../models/vehiclemanagement/vehicelmodel';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseVehicelServiceService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  /**
   * 查询
   */
  public Search(data: any): Observable<PageQueryResult<Vehicelmodel[]>> {

    const options = new HttpParams({ fromObject: data});

    return this.httpclient.get<PageQueryResult<Vehicelmodel[]>>(this.appConfiguration.Server + '/api/Vehicel/Search', {params: options})
      .pipe(
        tap(heroes => console.log(heroes)));
  }

}
