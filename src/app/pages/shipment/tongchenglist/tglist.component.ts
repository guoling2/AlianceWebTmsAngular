import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Commonsetting} from '../../../help/commonsetting';
import {DataStateChangeEventArgs, GridComponent} from '@syncfusion/ej2-angular-grids';
import {Basereportconfig} from '../../../services/base/basereportconfig';
import {DialogservicesService} from '../../../help/dialogservices.service';
import {MyShpipmentOrderService} from '../../../services/logistic/shipment/myshpipmentorderService';
import {EmitService} from '../../../help/emit-service';
import {MatDialog} from '@angular/material';
import {Basereportservice} from '../../../services/base/basereportservice';
import {AlertMessageType, EmitAlertMessage} from '../../../help/emit-alert-message';
import {DelegateorderComponent} from '../list/command/delegateorder/delegateorder.component';
import {CreateShipmentPlanComponent} from '../command/createshipmentplan/createshipmentplan.component';
import {ShipmentOrderViewModel} from '../command/openshipmentviewmodel';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import {DriverShipmentPlanCancleRequest, ShipmentPlanCancleType} from '../../../models/shipment/driver-shipment-plan-cancle-request';
import {TmsResponseModle} from '../../../models/tms-response.module';
import {ShipplanService} from '../../../services/logistic/shipment/shipplan.service';

@Component({
  selector: 'app-tglist',
  templateUrl: './tglist.component.html',
  styleUrls: ['./tglist.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TglistComponent implements OnInit {
  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: true})
  public grid: GridComponent;
  public taskitems: ItemModel[] = [
    {
      text: '提货取消',
      iconCss: 'e-ddb-icons e-dashboard'
    },
    {
      text: '配送取消',
      iconCss: 'e-ddb-icons e-notifications',
    }];
  constructor(
     private  shipplanService: ShipplanService,
     private  dialogx: DialogservicesService,
     private  myShpipmentOrderService: MyShpipmentOrderService,
     public emitService: EmitService, private fb: FormBuilder, public dialog: MatDialog, private service: Basereportservice ) { }

  ngOnInit() {
    this.searchp = this.fb.group(
      { OrderTrackServerId: '', TaskExcuteStatueId: ''});
    this.gridheight = Commonsetting.GridHeight();
  }
  public  dataStateChange(datastate: DataStateChangeEventArgs): void {

    this.searching();
  }
  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage;
    searchable.pagesize = pagesetting.pageSize;

    this.service.SearchReport(Basereportconfig.Report_logisttongchenglist, searchable).subscribe(result => {

      this.grid.dataSource = result;

    });
  }

  /**
   * 用车安排
   */
  openplan () {

    const selectedrows =  this.grid.getSelectedRecords();
    if (selectedrows.length === 0) {

      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择订单之后在进行操作！'));

    } else {
      const datasource = new Array<ShipmentOrderViewModel>();

      for (let i = 0; i < selectedrows.length; i++) {
        const x = new ShipmentOrderViewModel();
        x.ShipmentId = (selectedrows[i] as any).ShipmentId;
        x.DestCity = (selectedrows[i] as any).DestCity;
        x.OrderPhVol = (selectedrows[i] as any).OrderPhVol;
        x.OrderZhWeight = (selectedrows[i] as any).OrderZhWeight;
        datasource[i] = x;
      }
      // ShipmentOrder
      const dialogRef = this.dialog.open(CreateShipmentPlanComponent, {
        height: '150em',
        width: '150em',
        disableClose: true,
        data: datasource
      });

      dialogRef.afterClosed().subscribe(result => {
          if ( result != null ) {
            this.emitService.eventEmit.emit(
              new EmitAlertMessage(AlertMessageType.Succeed, '系统信息', result.Info));

            this.searching();
          }
      });
    }
  }

  /**
   * 任务取消
   */
  cacletask ( $event: MenuEventArgs ) {

    console.log(($event.item as ItemModel).text);
    const alerter = {
      Title: '警告',
      Message: '是否取消该任务，该操作不可逆 请谨慎处理！',
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if ( !result ) {
          return;
        }
        const x = new DriverShipmentPlanCancleRequest();
        x.ShipmentId = new Array<string>();
        x.IsForce = false;
        switch ( ($event.item as ItemModel).text ) {
          case '提货取消':
            x.PlanType = ShipmentPlanCancleType.TihuoPlan;
            break;
          case  '配送取消':
            x.PlanType = ShipmentPlanCancleType.PeiZai;
            break;
        }

        const selectedrows =  this.grid.getSelectedRecords();
        if (selectedrows.length == 0) {
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择订单之后在进行操作！'));
        }
        for (let i = 0; i < selectedrows.length; i++) {
          x.ShipmentId.push((selectedrows[i] as any).ShipmentId);
        }
        this.shipplanService.plancacle(x).subscribe((value: TmsResponseModle) => {
          console.log(value);
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Info, '系统信息', value.Info));
          this.searching();
        }, (xeeor: any) => {
          console.log(xeeor);
        });
      })};
    this.dialogx.openDialog(alerter);

  }
}
