// import {Component, Inject, OnInit, ViewChild} from '@angular/core';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import {AlertModel} from '../../../../../component/tms/alert/alertdata';
// import {LogisticStore} from '../../../../../models/LogisticStore/logistic-store';
// import {MockLogisticStoreData} from './MockData/mock-logistic-store-data';
// import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
// import {Listviewmodel} from '../../listviewmodel';
// import {Dictionary} from '../../../../../help/Dictionary';
// import {AcceptOrderGroupModel} from './accept-order-group-model';
// import {DriverProfile} from '../../../../../models/User/driver-profile';
// import {MockDriverProfileDataSource} from './MockData/mock-driver-profile';
// import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';
// import {TmsResponseModle} from '../../../../../models/tms-response.module';
// import {ShipmentSaveOrder} from '../../../../../models/shipment/shipment-save-order';
//
// import {error} from 'util';
// import {Subscription} from 'rxjs/src/internal/Subscription';
// import {LogisticStoreAuthorizeServiceService} from '../../../../../services/logisticstore/logistic-store-authorize-service.service';
// import {LogisticStoreServiceService} from '../../../../../services/logisticstore/logisticstoreservice';
// import {SwitchComponent} from '@syncfusion/ej2-angular-buttons';
// /** Error when invalid control is dirty, touched, or submitted. */
//
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }
//
//
// @Component({
//   selector: 'app-accept-order',
//   templateUrl: './accept-order.component.html',
//   styleUrls: ['./accept-order.component.css']
// })
// export class AcceptOrderComponent implements OnInit {
//
//   @ViewChild('sample')
//   public listObj: DropDownListComponent;
//
//   logistticstores: LogisticStore[]|any;
//
//   logistticstoresquery: LogisticStore[]|any;
//
//   public logisticstorefiled: Object = { text: 'StoreName', value: 'StoreId' };
//
//   public driverfields: Object = { text: 'RealName', value: 'UserId' };
//
//
//   public displayedColumns: string[] = ['DestCityName', 'TotalCount', 'TotalWeight', 'TotalVol', 'TotalOrderCount'];
//
//   public  loadsource: Array<AcceptOrderGroupModel>;
//
//
//   public  driversource: DriverProfile[] = [];
//
//   public selectorderIds: string[] = [];
//
//   matcher = new MyErrorStateMatcher();
//
//   acceptforms: FormGroup;
//
//
//   isorderself: boolean;
//
//   isalreadyhasitem: boolean;
//
//   ErrorMsg: string;
//
//   @ViewChild('orderselfswitch')
//   public orderselfswitch: SwitchComponent;
//
//   @ViewChild('hasorderswitch')
//   public hasorderswitch: SwitchComponent;
//
//   constructor(
//     private logisticStoreAuthorizeServiceService: LogisticStoreAuthorizeServiceService,
//     private logisticStoreServiceService: LogisticStoreServiceService,
//               private fb: FormBuilder, public dialogRef: MatDialogRef<AcceptOrderComponent>,
//               @Inject(MAT_DIALOG_DATA) public datasource: object) {
//
//     this.acceptforms = this.fb.group({
//       acceptlogisticstore: ['', Validators.required],
//       sendlogisticstore: [null],
//       isorderself: [false],
//       isalreadyhasitem: [false]
//     });
//
//   }
//
//   /**
//    * 网点的验证
//    */
//   get acceprlogisticstorecheck() { return this.acceptforms.get('acceptlogisticstore'); }
//
//
//
//   ngOnInit() {
//
//     console.log(this.datasource);
//
//     const datadic = new Dictionary<string, AcceptOrderGroupModel>();
//
//     // @ts-ignore
//     for (let i = 0; i < this.datasource.Source.length; i++) {
//
//
//
//
//       // @ts-ignore
//       const selectdata = this.datasource.Source[i];
//
//       this.selectorderIds.push(selectdata.SystemOrderId);
//
//       if (!datadic.ContainsKey(selectdata.DestCity)) {
//         datadic.Add(selectdata.DestCity, {
//           DestCityName: selectdata.DestCity,
//           TotalCount: 0,
//           TotalWeight: 0,
//           TotalVol: 0,
//           TotalOrderCount: 0});
//       }
//
//       const ordergroup = datadic.TryGetValue(selectdata.DestCity);
//
//       ordergroup.DestCityName = selectdata.DestCity;
//       ordergroup.TotalCount += Number(selectdata.OrderItemCounts) ;
//       ordergroup.TotalWeight += Number(selectdata.Grosston);
//       ordergroup.TotalVol += Number(selectdata.PhVol);
//       ordergroup.TotalOrderCount = ordergroup.TotalOrderCount + 1;
//
//       datadic.SetDicValue(selectdata.DestCity, ordergroup);
//
//     }
//
//     this.loadsource = datadic.GetValues();
//     this.logisticStoreAuthorizeServiceService.MyStores().subscribe( (value: LogisticStore[]) => {this.logistticstores = value; });
//     this.logisticStoreServiceService.StoreQuery().subscribe((value: LogisticStore[]) => {this.logistticstoresquery = value; });
//     this.driversource = MockDriverProfileDataSource;
//
//
//
//   }
//
//   SaveData($event) {
//
//     if (this.acceptforms.valid === false) {
//       return;
//     }
//
//     const formvalues = this.acceptforms.getRawValue();
//
//
//     const shipmentOrder = new ShipmentSaveOrder(
//       formvalues.acceptlogisticstore,
//       this.selectorderIds,
//       formvalues.sendlogisticstore,
//       this.orderselfswitch.checked,
//       this.hasorderswitch.checked
//       );
//     // this.orderService.ShipSotoreAcceptOrder(shipmentOrder).subscribe(
//     //    (value: TmsResponseModle) => {
//     //      console.log(value);
//     //      this.dialogRef.close(value);
//     //   }, (xerror: any) => {
//     //     alert(xerror);
//     //   });
//
//   }
// }
