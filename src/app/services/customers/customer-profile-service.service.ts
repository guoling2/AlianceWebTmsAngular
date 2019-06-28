import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TmshttpclientService} from '../tmshttpclient.service';
import {tap} from 'rxjs/operators';
import {TmsResponseModle} from '../../models/tms-response.module';
import {Observable} from 'rxjs';
import {CustomerProfileModle} from '../../models/customers/customer-profile-modle';
import {ej} from '@syncfusion/ej2-data/dist/global';
import data = ej.data;
import {CustomerAddrequestModle} from '../../models/customers/customer-addrequest-modle';

@Injectable({
  providedIn: 'root'
})
export class CustomerProfileServiceService {

  constructor(private readonly appConfiguration: AppConfiguration, private tmshttpclientService: TmshttpclientService, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  /**
   * 新增
   */
  public Update(customerId: string, datax: CustomerProfileModle): Observable<TmsResponseModle> {

    return this.tmshttpclientService.PostAsJson(datax, '/api/CustomerProfile/update/' + customerId);
  }

  public Insert(datax: CustomerAddrequestModle): Observable<TmsResponseModle> {

    return this.tmshttpclientService.PostAsJson(datax, '/api/CustomerProfile/add');
  }

  public Delete(customerId: string): Observable<TmsResponseModle> {

    return this.httpclient.delete<TmsResponseModle>(this.appConfiguration.Server + '/api/CustomerProfile/del/' + customerId)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 明细
   */
  public Detail(Id: string): Observable<CustomerProfileModle> {

    return this.httpclient.get<CustomerProfileModle>(this.appConfiguration.Server + '/api/CustomerProfile/Detail?Id=' + Id)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

}
