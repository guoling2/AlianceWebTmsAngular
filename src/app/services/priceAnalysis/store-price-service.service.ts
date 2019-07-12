import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderAbnormalMessageViewModel} from '../../models/badorder/OrderAbnormalMessageViewModel';
import {tap} from 'rxjs/operators';
import {StoreCaclRequestModel} from '../../models/priceAnalysis/store-cacl-request-model';
import {TmshttpclientService} from '../tmshttpclient.service';
import {TmsResponseModle} from '../../models/tms-response.module';

@Injectable({
  providedIn: 'root'
})
export class StorePriceServiceService {

  constructor(private tmshttpclientService: TmshttpclientService, private readonly appConfiguration: AppConfiguration, private  httpclient: HttpClient) {
    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:59471';
    }
  }

  public Analysis(storeCaclRequestModel: StoreCaclRequestModel): Observable<TmsResponseModle> {

    return   this.tmshttpclientService.PostAsJson(storeCaclRequestModel, '/api/StorePrice/Analysis');

  }
}
