import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../../auth/config/app-configuration';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TmshttpclientService} from '../../tmshttpclient.service';
import {Observable} from 'rxjs';
import {OrderAbnormalProcessResultModel} from '../../../models/badorder/order-abnormal-process-result-model';
import {tap} from 'rxjs/operators';
import {ShipSignDetailModel} from '../../../models/shipment/ship-sign-detail-model';
import {TmsResponseModle} from '../../../models/tms-response.module';

@Injectable({
  providedIn: 'root'
})
export class ShipmentSignatureService {

  constructor( private readonly appConfiguration: AppConfiguration,
               private  httpclient: HttpClient,
               private tmshttpclientService: TmshttpclientService) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:59471';
    }

  }

  public add(data: any): Observable<TmsResponseModle> {


    const formData: FormData = new FormData();

    Object.keys(data).forEach(field => {
      console.log(field);
      formData.append(field, data[field]);
    });

    console.log(formData);

    return this.httpclient.post<TmsResponseModle>(
      this.appConfiguration.Server + '/api/ShipmentSignature/Create/' , formData)
      .pipe(
        tap(heroes => console.log(heroes)));

  }
  /**
   * 结案记录
   * 消息ID messageid
   */
  public  detail(orderLogisticDetailId: string): Observable<ShipSignDetailModel> {
    return this.httpclient.get<ShipSignDetailModel>(
      this.appConfiguration.Server + '/api/ShipmentSignature/detail/' + orderLogisticDetailId)
      .pipe(
        tap(heroes => console.log(heroes)));

  }


}
