import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TmsStringContentResult} from '../../models/tms-string-content-result';
import {BusAreaEntity} from '../../models/base/busareaEntity';

@Injectable({
  providedIn: 'root'
})
export class BusAreaService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  /**
   *  通用的查询服务
   */
  public SearchArea(areaname: string): Observable<BusAreaEntity[]> {



    return this.httpclient.get<BusAreaEntity[]>(
      this.appConfiguration.Server + '/api/BusArea/Search?areaname=' + areaname);

  }
}
