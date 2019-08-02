import { Injectable } from '@angular/core';
import {AppConfiguration} from '../../auth/config/app-configuration';
import {HttpClient} from '@angular/common/http';
import {TmshttpclientService} from '../tmshttpclient.service';
import {Observable} from 'rxjs';
import {TmsResponseModle} from '../../models/tms-response.module';
import {InsideShipmentGroupModel} from '../../models/shipplangroup/inside-shipment-group-model';
import {ShimentNoSendGroupView} from '../../models/shipplangroup/shiment-no-send-group-view';
import {ShipmentLogisticItemAttchModel} from '../../models/shipplangroup/shipment-logistic-item-attch-model';

@Injectable({
  providedIn: 'root'
})
export class ShipplanGroupInsideServiceService {

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
   *  创建派车单头部信息
   */
  public CreateShipplanGroup(task: InsideShipmentGroupModel): Observable<TmsResponseModle> {
    return  this.tmshttpclientService.PostAsJson(task, '/api/ShipmentPlanGroupForInside/creategroup');
  }

  /**
   * 查询未审核的派车单
   */
  public SearchNoSendGroup(vehicelname: string): Observable<ShimentNoSendGroupView[]> {
    return  this.httpclient.get<ShimentNoSendGroupView[]>(
      this.appConfiguration.Server + '/api/ShipmentPlanGroupForInside/searchnosend?vehicelname=' + vehicelname);
  }

  /**
   * 附加托运单到派车单
   */
  public AttchShipmentItem(ShipmentLogisticItemAttch: ShipmentLogisticItemAttchModel): Observable<TmsResponseModle> {
    return  this.tmshttpclientService.PostAsJson(ShipmentLogisticItemAttch, '/api/ShipmentPlanGroupForInside/attchitem');
  }


}
