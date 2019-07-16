import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { ItemModel, MenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';
import {TabComponent, SelectEventArgs} from '@syncfusion/ej2-angular-navigations';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ExcelExportService, GridComponent, ResizeService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { DataStateChangeEventArgs, PageEventArgs} from '@syncfusion/ej2-angular-grids';
import {MockShipmentOrderPlan, MockShipmentPareOrders} from './mock-shipmentlist';
import {EmitService} from '../../../help/emit-service';
import {MatDialog} from '@angular/material';
import {AlertMessageType, EmitAlertMessage} from '../../../help/emit-alert-message';
import {DelegateorderComponent} from './command/delegateorder/delegateorder.component';
import {ButtonComponent} from '@syncfusion/ej2-angular-buttons';
import {ShipService} from '../../../services/logistic/shipment/ship.service';
import {ShipplanService} from '../../../services/logistic/shipment/shipplan.service';
import {AlertModel} from '../../../component/tms/alert/alertdata';
import {DialogAlertComponent} from '../../../component/tms/alert';
import { DataManager, Query, JsonAdaptor } from '@syncfusion/ej2-data';
import {TmsResponseModle} from '../../../models/tms-response.module';
import {DialogservicesService} from '../../../help/dialogservices.service';
import {OrderStatuedSource, TaskitemsDatsource} from './shipmentlist-data';
import {Commonsetting} from '../../../help/commonsetting';


@Component({
  selector: 'app-shipmentlist',
  templateUrl: './shipmentlist.component.html',
  styleUrls: ['./shipmentlist.component.css']
})
export class ShipmentlistComponent implements OnInit {
  public gridheight: number;
  public gridheight2: number;
  public taskitems: ItemModel[] = TaskitemsDatsource;
  public items: ItemModel[] = OrderStatuedSource;
  public headerText: Object = [{ text: '配载', 'iconCss': 'e-twitter' },
    { text: '计划', 'iconCss': 'e-facebook' }];
  @ViewChild('butonsearch', {static: false})
  public butonsearch: ButtonComponent;

  @ViewChild('listordetab', {static: false})
  public tabObj: TabComponent;

  @ViewChild('grid1', {static: false})
  public grid1: GridComponent;

  @ViewChild('grid2', {static: false})
  public grid2: GridComponent;

  public searchp: FormGroup;

  public  fiststdisplyanindex = false;

  public seconddisplyanindex = true;

  public  searchbtndisplay = true;

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor(private  dialogx: DialogservicesService, private shipplanService: ShipplanService, private shipService: ShipService, private fb: FormBuilder,
              private emitService: EmitService, private dialog: MatDialog) {

    this.searchp = this.fb.group({serverTrackId: '', shipmentstatued: ''});

  }


  ngOnInit() {

    this.gridheight = Commonsetting.GridHeight();
    this.gridheight2 = document.documentElement.clientHeight - 396;
  }

  public tabselect (e: number): void {
  // 如果用渲染的方式 感觉会卡顿。

    if ( e === 0 ) {

      this.searchbtndisplay = true;
    } else {
      this.searchbtndisplay = false;
    }
    console.log(e);
  }


  /**
   * 修改订单状态
   */
  public changeorderstatued(args: MenuEventArgs): void {

    const selectedrows =  this.grid1.getSelectedRecords();

    if (selectedrows.length === 0) {

      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择订单之后在进行操作！'));

      return;
    }

    let commandId = 0;
    switch (args.item.text ) {
      case '已提货':
        commandId = 19;
        break;
      case '已卸货':
        commandId = 29;
        break;
      case '已入库':
        commandId = 30;
        break;
      case '已出库':
        commandId = 40;
        break;
      default:
        commandId = 0;
        break;
    }

    const alerter = {
      Title: '警告',
      Message: '是否进行' + args.item.text + '操作',
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if ( !result ) {
          return;
        }
        let actionflag = 0;
        for (let i = 0; i < selectedrows.length ; i++) {

          const  ShipmentId = (selectedrows[i] as any).ShipmentId;

          this.shipService.updateorderstatued({ShipmentId: ShipmentId, CommandId: commandId}).subscribe((value: TmsResponseModle) => {

            actionflag += 1;

            console.log(value);

            this.emitService.eventEmit.emit(
              new EmitAlertMessage(AlertMessageType.Info, '系统信息', value.Info));

            if (actionflag >= (i + 1)) {
              this.searchingtrack(true);
            }

          }, (xeeor: any) => {
            console.log(xeeor);
          });
        }

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
  /**
   * 查询配载
   */
  searchingtrack(searchfirst: boolean= true) {


    const  pagesetting = this.grid1.pageSettings;

    if (searchfirst) {

      pagesetting.currentPage = 1;

      if (this.grid1.getSelectedRecords().length !== 0) {
        this.grid1.clearSelection();
      }
    }



    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage;
    searchable.pagesize = pagesetting.pageSize;

    this.shipService.searchReceiveOrder(searchable).subscribe(result => {this.grid1.dataSource = result; });

  }

  /**
   * 切换数据选项卡
   */
  public  dataStateChange(datastate: DataStateChangeEventArgs, gridname: string): void {

    if (gridname === '1') {
      this.searchingtrack(false);
    } else {
      this.searchingplan(false);
    }
  }

  openDialog(alertmodel: AlertModel): void {



     const datamanger = new DataManager();

    const dialogRef = this.dialog.open(DialogAlertComponent, {
      width: '250px',
      disableClose: true,
      data: {Title: alertmodel.Title, Message: alertmodel.Message, ConfirmModel: alertmodel.ConfirmModel}
    });

    if ((alertmodel.Callback != null)) {
      dialogRef.afterClosed().subscribe(result => {

        alertmodel.Callback(result);

      });
    }

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
        //       console.log(xeeor);
        // });
    })};
    this.dialogx.openDialog(alerter);

  }


  /**
   * 委派司机
   */
  delegateorder(args: MenuEventArgs) {


    if (args.item.text === '转运') {
      alert('未开放的功能');
      return;
    }

    let  tasktype = 1;


    if (args.item.text === '提货') {
       tasktype = 1;
     } else if (args.item.text === '转运' ) {
       tasktype = 2;
     } else if (args.item.text === '配送' ) {
       tasktype = 3;
     } else {
       tasktype = 0;
     }

    const selectedrows =  this.grid1.getSelectedRecords();


   // console.log(selectedrows);

    if (selectedrows.length === 0) {

      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择订单之后在进行操作！'));

    } else {

      const dialogRef = this.dialog.open(DelegateorderComponent, {
        height: '50em',
        width: '50em',
        disableClose: false,
        data: [selectedrows, tasktype]
      });

      // @ts-ignore
      dialogRef.afterClosed().subscribe(result => {


        if (result != null) {
          // 关闭了
          console.log(result);

          this.searchingtrack();

          if ( result != null ) {
            this.emitService.eventEmit.emit(
              new EmitAlertMessage(AlertMessageType.Succeed, '系统信息', result.Info));
          }
        }

    });

  }


}}




