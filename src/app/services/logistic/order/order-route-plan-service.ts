import {Injectable} from '@angular/core';
import {AppConfiguration} from '../../../auth/config/app-configuration';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../../models/tms-response.module';
import {tap} from 'rxjs/operators';
import {TrackRoueCaclResultModel} from '../../../models/TrackRoueCacl/track-roue-cacl-result-model';
@Injectable({
  providedIn: 'root'
})
export class OrderRoutePlanService {


  constructor(private appConfiguration: AppConfiguration, private  httpclient: HttpClient) {

    if (this.appConfiguration == null) {
      this.appConfiguration = new AppConfiguration();
      this.appConfiguration.Server = 'http://localhost:52631';
    }
  }

  public Cacl(beginrouteId: string, endrouteId: string): Observable<TrackRoueCaclResultModel[]> {


  return   this.httpclient.get<TrackRoueCaclResultModel[]>
    (this.appConfiguration.Server + '/api/RoutePlan/Cacl?beginrouteId=' + beginrouteId + '&endrouteId=' + endrouteId);

  }


}
