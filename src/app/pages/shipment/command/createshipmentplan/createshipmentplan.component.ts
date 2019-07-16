import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Driverservice} from '../../../../services/profile/driverservice';
import {DriverProfile} from '../../../../models/User/driver-profile';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {TextBoxComponent} from '@syncfusion/ej2-angular-inputs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ShipmentOrderViewModel} from '../openshipmentviewmodel';
import {ShipplanService} from '../../../../services/logistic/shipment/shipplan.service';
import {TmsResponseModle} from '../../../../models/tms-response.module';

@Component({
  selector: 'app-create-shipmentplan',
  templateUrl: './createshipmentplan.component.html',
  styleUrls: ['./createshipmentplan.component.css']
})
export class CreateShipmentPlanComponent implements OnInit {

  public saveform: FormGroup;

  public driverfields: Object = { text: 'RealName', value: 'UserId' };

  public driversource: DriverProfile[] = [];

  @ViewChild('ShipmentCarryingToolId', {static: false})
  public ShipmentCarryingToolTxt: TextBoxComponent;


  constructor(
    private shipplanService: ShipplanService,
    private fb: FormBuilder, private  driverservice: Driverservice, public dialogRef: MatDialogRef<CreateShipmentPlanComponent>,
               @Inject(MAT_DIALOG_DATA) public datasource: ShipmentOrderViewModel[]) { }

  ngOnInit() {
    this.saveform = this.fb.group({
      ShipmentUserId: ['', Validators.required],
      ShipmentCarryingToolId: ['未知']
    });
    this.driverservice.MyDrivers().subscribe(reslut => {this.driversource = reslut; });

  }

  /**
   * 司机验证
   */
  get aaccpetdrivercheck() { return this.saveform.get('ShipmentUserId'); }

  /**
   * 委派
   */
  save () {
    if (!this.saveform.valid) {
      return;
    }
    const searchable = this.saveform.getRawValue ();
    searchable.FullShipmentId  = new Array<string>();
    for (let i = 0; i < this.datasource.length; i++) {
      searchable.FullShipmentId .push(this.datasource[i].ShipmentId);
    }
    this.shipplanService.plancreate(searchable).subscribe((value: TmsResponseModle) => {
      console.log(value);
      this.dialogRef.close(value);
    }, (xeeor: any) => {
      alert(xeeor);
    });
  }

  close () {
    this.dialogRef.close();
  }
}
