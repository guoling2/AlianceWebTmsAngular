import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {TmshttpclientService} from '../tmshttpclient.service';
import {Observable} from 'rxjs';
import {OrderAbnormalPaymentModel} from '../../models/badorder/order-abnormal-payment-model';
import {tap} from 'rxjs/operators';
import {Tmsdocument} from '../../models/tmsdocument';


@Injectable({
  providedIn: 'root'
})
export class OrderAbnormalFileService {

  constructor( private readonly appConfiguration: AppConfiguration,
               private  httpclient: HttpClient,
               private tmshttpclientService: TmshttpclientService) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:59471';
    }
    //  this.appConfiguration.Server = 'http://localhost:59471';
  }
  /**
   * 文档记录
   * 消息ID messageid
   */
  public  list(messageid: string): Observable<Tmsdocument[]> {
    return this.httpclient.get<Tmsdocument[]>(
      this.appConfiguration.Server + '/api/OrderAbnormalFile/list?messageId=' + messageid)
      .pipe(
        tap(heroes => console.log(heroes)));

  }
}
