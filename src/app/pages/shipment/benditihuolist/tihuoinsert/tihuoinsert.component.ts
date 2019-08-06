import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {VehicelTaskTypeDataSource} from '../../../../modeldata/vehicel-task-type';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {GroupOrderAtionModel} from '../../groupforInside/group-order-ation-model';
import {UpdateModelType} from '../../../../models/tms-data-entity';
import {LogisticItemService} from '../../../../services/logistic/shipment/logistic-item.service';
import {LogisticItemComponentService} from '../../../../services/logistic/shipment/logistic-item-service.component';
import {EmitService} from '../../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {ShipplanGroupInsideServiceService} from '../../../../services/shiipplangroup/shipplan-group-inside-service.service';
import {InsideShipmentGroupModel} from '../../../../models/shipplangroup/inside-shipment-group-model';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';
import {DialogservicesService} from '../../../../help/dialogservices.service';

@Component({
  selector: 'app-biz-tihuoinsert',
  templateUrl: './tihuoinsert.component.html',
  styleUrls: ['./tihuoinsert.component.css']
})
export class TihuoinsertComponent implements OnInit {


  public saveform: FormGroup;
  vehicelTaskTypeDataSource = new VehicelTaskTypeDataSource();
  @Input() orderStoreSubject: BehaviorSubject<GroupOrderAtionModel>;

  public tasktype: string;
  constructor( private  dialogx: DialogservicesService, private groupInsideServiceService: ShipplanGroupInsideServiceService,  public emitService: EmitService, private logisticItemService: LogisticItemService, private itemServiceService: LogisticItemComponentService, private fb: FormBuilder, private route: ActivatedRoute) { }


  ngOnInit() {

   // this.tasktype = this.vehicelTaskTypeDataSource.XieCheTihuo().TaskTypeName;

    this.saveform = this.fb.group({});


    this.orderStoreSubject.subscribe((a: GroupOrderAtionModel) => {

      if (a != null) {

        this.logisticItemService.detail(a.ShipmentId, '').subscribe(item => {
          if (item.ShipmentPlanId === null) {
            this.itemServiceService.AttchItem(item);
          } else {
            this.emitService.eventEmit.emit(
              new EmitAlertMessage(AlertMessageType.Error, '系统信息', '已经添加', MessageShowType.Toast));
          }

        });
      }
    });
  }


  savedata() {


    console.log(this.saveform.getRawValue());


    if( this.itemServiceService.LogisticItemSource.length === 0) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '没有可以派车的托运单', MessageShowType.Toast));
    }

    const bm = this.saveform.controls['LogisticFeeBlanceMethod'].value;

    if (bm === null) {
      this.saveform.patchValue({LogisticFeeBlanceMethod: 0});
    }

    const alerter = {
      Title: '确认',
      Message: '是否创建派车单？',
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if ( !result ) {
          return;
        }
        try {
           this.savedata2();
        } finally {

        }

      })};
    this.dialogx.openDialog(alerter);



  }


  savedata2() {

    if (this.saveform.valid === true) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Info, '系统信息', '开始创建派车单', MessageShowType.Toast));

      const model = <InsideShipmentGroupModel>this.saveform.getRawValue();
      this.groupInsideServiceService.CreateShipplanGroup(model).subscribe(a => {
        if (a.StatusCode === TmsresponseStatusCode.Succeed()) {
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Info, '系统信息', '派车单运输信息创建成功', MessageShowType.Toast));
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Info, '系统信息', '开始附加托运单', MessageShowType.Toast));
        }
      });
    } else {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '验证失败', MessageShowType.Toast));
    }
  }

}
