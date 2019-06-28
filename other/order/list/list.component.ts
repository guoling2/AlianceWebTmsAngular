// import {Component, OnInit, ViewChild} from '@angular/core';
//
//
// import {DialogAlertComponent} from '../../../component/tms/alert';
//
// import { ExcelExportService, GridComponent, ResizeService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';
// import { DataStateChangeEventArgs, PageEventArgs} from '@syncfusion/ej2-angular-grids';
// import {FormBuilder, FormGroup} from '@angular/forms';
// import {ClickEventArgs} from '@syncfusion/ej2-navigations';
//
// import {MoclOrders} from './mock-orders';
// import {MatDialog, MatDialogRef} from '@angular/material';
// import {Dictionary} from '../../../help/Dictionary';
// import {AcceptOrderComponent} from './Command/AcceptOrder/accept-order.component';
// import {Listviewmodel} from './listviewmodel';
// import {ToastComponent} from '@syncfusion/ej2-angular-notifications';
// import {EmitService} from '../../../help/emit-service';
// import {AlertMessageType, EmitAlertMessage} from '../../../help/emit-alert-message';
// import {AlertModel} from '../../../component/tms/alert/alertdata';
// import { DataManager, Query, JsonAdaptor } from '@syncfusion/ej2-data';
// import {assertNumber} from '@angular/core/src/render3/assert';
// import {formatNumber} from '@angular/common';
// import {TmsResponseModle} from '../../../models/tms-response.module';
//
//
//
// @Component({
//   selector: 'app-order-list',
//   templateUrl: './list.component.html',
//   styleUrls: ['./list.component.css'],
//   providers: [ResizeService, ToolbarService, SortService, ExcelExportService]
// })
// export class ListComponent implements OnInit {
//
//
//
//   public position: Object = { X: 'Right' };
//
//   private  datadic: Dictionary<string, object> ;
//
//   public header = '提示';
//
//   public content = 'Your current software version is up to date.';
//
//   public title = '订单运输列表';
//
//   public toolbar: string[];
//   public initialSort: Object;
//   public gridheight: number;
//
//   public editSettings: Object;
//
//   public selectOptions: Object;
//
//   public isModal: Boolean = true;
//
//   public animationSettings: Object = { effect: 'None' };
//
//   public initialPage: Object;
//
//   searchp: FormGroup;
//   @ViewChild('grid')
//   public grid: GridComponent;
//
//   @ViewChild('defaulttoast')
//   public toastObj: ToastComponent;
//
//   public  selctrows: {[key: string]: object; };
//
//   private Listviewmdatasource: Array<Listviewmodel> = [];
//
//   private dialogRef: MatDialogRef<DialogAlertComponent>;
//
//   private  datamanger: DataManager;
//
//
//   constructor( public emitService: EmitService, public dialog: MatDialog,  private fb: FormBuilder) {
//
//     this.gridheight = document.documentElement.clientHeight - 320;
//     this.selectOptions = { persistSelection: true };
//     this.editSettings = { allowDeleting: true };
//     // console.log(document.documentElement.clientHeight)  ;
//     this.searchp = this.fb.group(
//       { serverTrackId: '', customerOrderStatus: ''});
//
//     this.datadic = new  Dictionary<string, object>();
//
//   }
//
//   openDialog(alertmodel: AlertModel): void {
//
//
//
//     this.datamanger = new DataManager();
//
//      this.dialogRef = this.dialog.open(DialogAlertComponent, {
//       width: '250px',
//       disableClose: true,
//       data: {Title: alertmodel.Title, Message: alertmodel.Message, ConfirmModel: alertmodel.ConfirmModel}
//     });
//
//      if ((alertmodel.Callback != null)) {
//        this.dialogRef.afterClosed().subscribe(result => {
//
//          alertmodel.Callback(result);
//
//        });
//      }
//
//   }
//
//   ngOnInit() {
//     // this.initialSort = {
//     //     //   columns: [{ field: 'originarea', direction: 'Ascending' },
//     //     //     { field: 'createDatetime', direction: 'Ascending' }]
//     //     // };
//     // this.toolbar = ['Excel导出'];
//
//      const  xx = this.grid.query;
//
//      console.log(xx);
//
//     this.grid.pageSettings.pageSize = 20;
//     this.grid.pageSettings.pageSizes = [20, 50];
//
//     this.searching();
//
//
//
//   }
//   toolbarClick(args: ClickEventArgs): void {
//
//      console.log(args.item);
//
//     switch (args.item.text) {
//       case 'PDF Export':
//         this.grid.pdfExport();
//         break;
//       case 'Excel导出':
//         this.grid.excelExport();
//         break;
//       case 'CSV Export':
//         this.grid.csvExport();
//         break;
//     }
//   }
//
//   /**
//    * 数据查询
//    */
//   searching(searchfirst: boolean= true): void {
//
//     const  pagesetting = this.grid.pageSettings;
//
//     if (searchfirst) {
//
//         pagesetting.currentPage = 1;
//
//         if (this.grid.getSelectedRecords().length !== 0) {
//           this.grid.clearSelection();
//         }
//     }
//
//
//
//     const searchable = this.searchp.getRawValue ();
//     searchable.pageindex = pagesetting.currentPage;
//     searchable.pagesize = pagesetting.pageSize;
//
//     // this.orderService.SearchFirstHandItems(searchable).subscribe(result => {this.grid.dataSource = result; });
//     }
//
//   /**
//    * 加载远程数据源
//    */
//   private changeviewmodel(datasouce: object[]): void {
//
//
//       console.log('加载数据');
//       console.log(datasouce);
//
//     for (let i = 0; i < datasouce.length; i++) {
//
//       this.Listviewmdatasource.push(<Listviewmodel>datasouce[i]);
//     }
//
//     console.log(this.Listviewmdatasource);
//
//     this.grid.dataSource = this.Listviewmdatasource;
//
//   }
//
//   public  dataStateChange(datastate: DataStateChangeEventArgs): void {
//
//            this.searching(false);
//   }
//   /**
//    * 接单
//    * @param usedriver
//    */
//   public acceptorder(usedriver: boolean): void {
//
//
//     const selectedrows =  this.grid.getSelectedRecords();
//
//     if (selectedrows.length === 0) {
//
//       this.emitService.eventEmit.emit(
//         new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择订单之后在进行操作！'));
//
//     } else {
//
//       const dialogRef = this.dialog.open(AcceptOrderComponent, {
//         height: '50em',
//         width: '50em',
//         disableClose: false,
//         data: {Source: selectedrows, NeedSend: usedriver }
//       });
//
//       dialogRef.afterClosed().subscribe(result => {
//
//         // 关闭了
//         if (result == null) {return; }
//
//         this.searching(true);
//
//         this.emitService.eventEmit.emit(
//           new EmitAlertMessage(AlertMessageType.Info, '系统信息', result.Info));
//
//
//
//       });
//
//     }
//
//
//
//   }
//
//   /**
//    * 退单
//    */
//   backorder() {
//
//
//     const selectedrows =  this.grid.getSelectedRecords();
//
//     if (selectedrows.length === 0) {
//
//       this.emitService.eventEmit.emit(
//         new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择订单之后在进行操作！'));
//
//       return;
//     }
//
//     const rejectsystemorder = (<Listviewmodel>selectedrows[0]);
//
//     const alerter = {
//                        Title: '警告',
//                        Message: rejectsystemorder.ServerTrackId + '是否退单，该操作不可逆 请谨慎处理！',
//                        ConfirmModel: true,
//                        Callback: ((result: boolean) => {
//
//                          if (!result) {
//                            return;
//                          }
//                         // alert(selectedrows[0].SystemOrderId);
//
//                          // this.orderService.ShipSotoreUnAcceptOrder(rejectsystemorder.SystemOrderId).subscribe(
//                          //   (value: TmsResponseModle) => {
//                          //     if ( value != null ) {
//                          //
//                          //       let msg = value.Info;
//                          //       if ( value.StatusCode === 200 ) {
//                          //         msg = rejectsystemorder.ServerTrackId + '退单成功';
//                          //       }
//                          //       this.emitService.eventEmit.emit(
//                          //         new EmitAlertMessage(AlertMessageType.Info,
//                          //           '系统信息',
//                          //           msg));
//                          //       this.searching(true);
//                          //     }
//                          //   });
//                        })
//                      };
//     this.openDialog(alerter);
//   }
//
//   searching1(flag: number): void{
//
//
//     switch ( flag ) {
//       case  1:
//         this.emitService.eventEmit.emit(
//           new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请选择订单之后在进行操作！'));
//         break;
//       case  2:
//         this.emitService.eventEmit.emit(
//           new EmitAlertMessage(AlertMessageType.Info, '系统信息', '请选择订单之后在进行操作！'));
//         break;
//       case  3:
//         this.emitService.eventEmit.emit(
//           new EmitAlertMessage(AlertMessageType.Succeed, '系统信息', '请选择订单之后在进行操作！'));
//         break;
//     }
//
//
//   }
// }
