import { Injectable } from '@angular/core';
import {TmshttpclientService} from '../tmshttpclient.service';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {CustomerTaxModle} from '../../models/customers/customer-tax-modle';

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
   * 新增
   */
  public Insert(customerId: string, datax: CustomerTaxModle): Observable<TmsResponseModle> {

    return this.tmshttpclientService.PostAsJson(datax, '/api/CustomerTax/add/' + customerId);
  }

}
