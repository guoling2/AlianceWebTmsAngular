import { Injectable } from '@angular/core';
import {TmshttpclientService} from '../tmshttpclient.service';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {CustomerTaxModle} from '../../models/customers/customer-tax-modle';
import {CustomerAddressModle} from '../../models/customers/customer-address-modle';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerTaxServiceService {

  constructor( private readonly appConfiguration: AppConfiguration, private tmshttpclientService: TmshttpclientService, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }
  /**
   * 删除
   */
  public Delete( customerId: string,  taxId: number): Observable<TmsResponseModle> {

    // const options = new HttpParams({ fromObject: data});
    // const result2 = this.httpclient.get<TmsResponseModle>(this.appConfiguration.Server + '/api/logistic/QueryOrders',data.ts);


    return this.httpclient.delete<TmsResponseModle>(this.appConfiguration.Server + '/api/CustomerTax/del/' + customerId + '/' + taxId)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
  /**
   * 新增
   */
  public Insert(customerId: string, datax: CustomerTaxModle): Observable<TmsResponseModle> {

    return this.tmshttpclientService.PostAsJson(datax, '/api/CustomerTax/add/' + customerId);
  }
  /**
   * 查询
   */
  public Search(customerId: string): Observable<CustomerTaxModle[]> {

    return this.httpclient.get<CustomerTaxModle[]>(this.appConfiguration.Server + '/api/CustomerTax/search/' + customerId)
      .pipe(
        tap(heroes => console.log(heroes)));
  }
}
