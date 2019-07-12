import { Injectable } from '@angular/core';
import {PageQueryResult} from '../../models/page-query-result';
import {Observable} from 'rxjs';
import {VehicleContainerModel} from '../../models/vehiclemanagement/container-model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleContainerService {


  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }
  /**
   * 查询
   */
  public Search(data: any): Observable<PageQueryResult<VehicleContainerModel[]>> {

    const options = new HttpParams({ fromObject: data});

    return this.httpclient.get<PageQueryResult<VehicleContainerModel[]>>
      (this.appConfiguration.Server + '/api/VehicleContainer/query', {params: options});

  }
}
