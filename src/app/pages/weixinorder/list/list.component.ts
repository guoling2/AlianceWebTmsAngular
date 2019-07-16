import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Wxorderserviceservice} from '../../../services/wxorder/wxorderservice';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {TmsStringContentResult} from '../../../models/tms-string-content-result';
import {Commonsetting} from '../../../help/commonsetting';
import {AlertMessageType, EmitAlertMessage} from '../../../help/emit-alert-message';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DialogAlertComponent} from '../../../component/tms/alert';
import {DelegateorderComponent} from '../../shipment/list/command/delegateorder/delegateorder.component';
import {EmitService} from '../../../help/emit-service';
import {WxOrderListModel} from 'src/app/models/orderlist/wxorderlistmodel';
import { DataStateChangeEventArgs, PageEventArgs} from '@syncfusion/ej2-angular-grids';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  gridheight: number;

  searchp: FormGroup;

  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  private dialogRef: MatDialogRef<DialogAlertComponent>;

  constructor(public emitService: EmitService, private fb: FormBuilder, public dialog: MatDialog, private wxorderserviceservice: Wxorderserviceservice) { }

  ngOnInit() {

    this.searchp = this.fb.group(
      { IfReceipt: '0'});
    this.gridheight = Commonsetting.GridHeight();
  }

  public  dataStateChange(datastate: DataStateChangeEventArgs): void {

    this.searching();
  }

  /**
   * 接单和退单
   * @param b
   */
  acceptorder ( b: boolean ) {


    const selectedrows =  this.grid.getSelectedRecords();

    if (selectedrows.length === 0) {

      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择订单之后在进行操作！'));

    } else {


    //  const  acceptorders = new Array<Listviewmodel>();
      // for (let i = 0; i < selectedrows.length; i++) {
      //
      // //  this.Listviewmdatasource.push(<Listviewmodel>datasouce[i]);
      //   const wxorder = <WxOrderListModel>selectedrows[i];
      //
      //   const order = new Listviewmodel();
      //   order.SystemOrderId = wxorder.OrderId;
      //   order. DestCity = wxorder.DestCity;
      //   order. OrderItemCounts = wxorder.PackageCount;
      //   order.Grosston = wxorder.PackageWeight;
      //   order. PhVol = wxorder.PackageVol;
      //
      //   acceptorders.push(order);
      // }

      // const dialogRef = this.dialog.open(AcceptOrderComponent, {
      //   height: '50em',
      //   width: '50em',
      //   disableClose: false,
      //   data: {Source: acceptorders, NeedSend: false }
      // });

      // @ts-ignore
      // dialogRef.afterClosed().subscribe(result => {
      //
      //
      //   if (result != null) {
      //     // 关闭了
      //     console.log(result);
      //
      //
      //
      //     if ( result != null ) {
      //       this.emitService.eventEmit.emit(
      //         new EmitAlertMessage(AlertMessageType.Succeed, '系统信息', result.Info));
      //
      //       this.searching();
      //     }
      //   }
      //
      // });

    }
  }


  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage;
    searchable.pagesize = pagesetting.pageSize;

    this.wxorderserviceservice.MyOrder(searchable).subscribe(result => {

      this.grid.dataSource = result;

    }); }
}
