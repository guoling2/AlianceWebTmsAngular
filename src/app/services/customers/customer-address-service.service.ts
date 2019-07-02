import { Injectable } from '@angular/core';
import {TmshttpclientService} from '../tmshttpclient.service';
import {CustomerAddressModle} from '../../models/customers/customer-address-modle';
import {HttpClient} from '@angular/common/http';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {tap} from 'rxjs/operators';
import {AbstractControl} from '@angular/forms';
import {CustomerQueryForOrdermodle} from '../../models/customers/customer-for-order-query-modle';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressServiceService {

  constructor( private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient, private tmshttpclientService: TmshttpclientService) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }
  /**
   * 新增
   */
  public  Insert(data: CustomerAddressModle): Observable<TmsResponseModle> {

    return  this.tmshttpclientService.PostAsJson(data, '/api/CustomerAddress/add/' + data.CustomerId);
  }
  /**
   * 删除
   */
  public  Delete(data: CustomerAddressModle): Observable<TmsResponseModle> {

    return  this.tmshttpclientService.PostAsJson(data, '/api/CustomerAddress/delete');
  }
  /**
   * 查询
   */
  public Search(companyId: string, customerId: string): Observable<CustomerAddressModle[]> {

    return this.httpclient.get<CustomerAddressModle[]>(this.appConfiguration.Server + '/api/CustomerAddress/Search/' + companyId + '/' + customerId)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

  /**
   * 一般用于系统内查询客户使用的
   * @公司ID companyId
   * @查询类型 searchtype
   * @查询内容 searchtxt
   */
  public SearchForCustomer(companyId: string, searchtype: string, searchtxt: string): Observable<CustomerQueryForOrdermodle[]> {

    return this.httpclient.get<CustomerQueryForOrdermodle[]>(
      this.appConfiguration.Server + '/api/CustomerAddress/Search/' + companyId +
      '?searchtype=' + searchtype + '&searchtxt=' + searchtxt)
      .pipe(
        tap(heroes => console.log(heroes)));
  }

}
