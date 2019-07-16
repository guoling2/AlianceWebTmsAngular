import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DriverProfile} from '../../../../../models/User/driver-profile';
import {LogisticStore} from '../../../../../models/LogisticStore/logistic-store';
import {TmsResponseModle} from '../../../../../models/tms-response.module';
import {ShipmentOrder} from '../../../../../models/shipment/shipment-plan-order';
import {Driverservice} from '../../../../../services/profile/driverservice';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import {ShipService} from '../../../../../services/logistic/shipment/ship.service';
import {LogisticStoreServiceService} from '../../../../../services/logisticstore/logisticstoreservice';
import {ShipplanService} from '../../../../../services/logistic/shipment/shipplan.service';

@Component({
  selector: 'app-delegateorder',
  templateUrl: './delegateorder.component.html',
  styleUrls: ['./delegateorder.component.css']
})
export class DelegateorderComponent implements OnInit {

  constructor(
    private logisticStoreServiceService: LogisticStoreServiceService,
    private  driverservice: Driverservice, private  shipService: ShipService, private fb: FormBuilder, public dialogRef: MatDialogRef<DelegateorderComponent>,
              @Inject(MAT_DIALOG_DATA) public datasource: object[]) {

    this.acceptforms = this.fb.group({
      ShipmentUserId: ['', Validators.required],
      TaskType: [datasource[1]],
      ShipmentCarryingToolName: ['未知'],
      middlelogiticstore: ['']
    });
  }
  /**
   * 司机验证
   */
  get aaccpetdrivercheck() { return this.acceptforms.get('ShipmentUserId'); }

  acceptforms: FormGroup;

  public driverfields: Object = { text: 'RealName', value: 'UserId' };

  public driversource: DriverProfile[] = [];

  public logisticstorefiled: Object = { text: 'StoreName', value: 'StoreId' };

  logistticstores: LogisticStore[]|any;


  public tasktype: string;
  ngOnInit() {


    this.driverservice.MyDrivers().subscribe(reslut => {this.driversource = reslut; });
    this.logisticStoreServiceService.StoreQuery().subscribe((value: LogisticStore[]) => {this.logistticstores = value; });
  }

  public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
    let query: Query = new Query();
    // frame the query based on search string with filter type.
    query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
    // pass the filter data source, filter query to updateData method.

  }


  save() {

    if (this.acceptforms.valid === false) {
      return;
    }

    const formvalues = this.acceptforms.getRawValue();



    const  saveorderid = [];


    const shiporders = <ShipmentOrder[]>this.datasource[0];
    for (let i = 0; i < shiporders.length; i++) {

      saveorderid.push(shiporders[i].ShipmentId);
    }
    formvalues.FullShipmentId = saveorderid;

    this.shipService.plandriver(formvalues).subscribe((value: TmsResponseModle) => {
      console.log(value);
      this.dialogRef.close(value);
    }, (xeeor: any) => {
      alert(xeeor);
    });

  }

}
