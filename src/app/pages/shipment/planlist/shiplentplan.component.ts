import {Component, OnInit, ViewChild} from '@angular/core';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {AlertMessageType, EmitAlertMessage} from '../../../help/emit-alert-message';
import {TmsResponseModle} from '../../../models/tms-response.module';
import {DialogservicesService} from '../../../help/dialogservices.service';
import {ShipplanService} from '../../../services/logistic/shipment/shipplan.service';
import {ShipService} from '../../../services/logistic/shipment/ship.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EmitService} from '../../../help/emit-service';
import {MatDialog} from '@angular/material';
import {Commonsetting} from '../../../help/commonsetting';

@Component({
  selector: 'app-shiplentplan',
  templateUrl: './shiplentplan.component.html',
  styleUrls: ['./shiplentplan.component.css']
})
export class ShiplentplanComponent implements OnInit {


  @ViewChild('grid2', {static: true})
  public grid2: GridComponent;

  public searchp: FormGroup;


  public  gridheight2: number;
  constructor(private  dialogx: DialogservicesService, private shipplanService: ShipplanService, private shipService: ShipService, private fb: FormBuilder,
              private emitService: EmitService, private dialog: MatDialog) {

    this.searchp = this.fb.group({
      serverTrackId: '', shipmentUserDesc: '', PlanTaskType: '', CarryingStatuedId: ''});


    this.gridheight2 = Commonsetting.GridHeight();
  }

  ngOnInit() {
  }
  /**
   * 取消委派
   */
  undelegateorder() {

    const selectedrows =  this.grid2.getSelectedRecords();

    if (selectedrows.length === 0) {

      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择订单之后在进行操作！'));

      return;
    }


    const  shipplanid = (selectedrows[0] as any).shipplanid;

    const alerter = {
      Title: '警告',
      Message: shipplanid + '是否退单，该操作不可逆 请谨慎处理！',
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if ( !result ) {
          return;
        }
        // this.shipplanService.plancacle({shipmentPlanId: shipplanid}).subscribe((value: TmsResponseModle) => {
        //   console.log(value);
        //   this.emitService.eventEmit.emit(
        //     new EmitAlertMessage(AlertMessageType.Info, '系统信息', value.Info));
        //   this.searchingplan(true);
        // }, (xeeor: any) => {
        //   console.log(xeeor);
        // });
      })};
    this.dialogx.openDialog(alerter);

  }
  /**
   * 查询计划
   */
  searchingplan(searchfirst: boolean= true) {
    const  pagesetting = this.grid2.pageSettings;

    if (searchfirst) {

      pagesetting.currentPage = 1;

      if (this.grid2.getSelectedRecords().length !== 0) {
        this.grid2.clearSelection();
      }
    }



    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage;
    searchable.pagesize = pagesetting.pageSize;

    this.shipplanService.searchplan(searchable).subscribe(result => {
      this.grid2.dataSource = result; });
  }
}
