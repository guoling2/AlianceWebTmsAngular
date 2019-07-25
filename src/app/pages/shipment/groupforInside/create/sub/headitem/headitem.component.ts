import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {VehicelTaskTypeDataSource} from '../../../../../../modeldata/vehicel-task-type';
import {OrderrouteplanComponent} from '../../../../../myorder/_sub/orderrouteplan/orderrouteplan.component';
import {MatDialog} from '@angular/material';
import {EmitService} from '../../../../../../help/emit-service';
import {HttpClient} from '@angular/common/http';
import {BusAreaService} from '../../../../../../services/base/bus-area.service';
import {FormsControlServiceService} from '../../../../../../services/forms-control-service.service';
import {ShipmentOrderService} from '../../../../../../services/logistic/order/shipment-order.service';
import {LogisticStoreServiceService} from '../../../../../../services/logisticstore/logisticstoreservice';
import {LogisticStoreAuthorizeServiceService} from '../../../../../../services/logisticstore/logistic-store-authorize-service.service';
import {CustomerTaxServiceService} from '../../../../../../services/customers/customer-tax-service.service';
import {DialogservicesService} from '../../../../../../help/dialogservices.service';
import {SelectvehicelComponent} from '../../../sub/selectvehicel/selectvehicel.component';
import {SelectdriverComponent} from '../../../sub/selectdriver/selectdriver.component';

@Component({
  selector: 'app-shipmentplan-insert-headitem',
  templateUrl: './headitem.component.html',
  styleUrls: ['./headitem.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: HeaditemComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: HeaditemComponent}
  ],
})
export class HeaditemComponent implements OnInit  {

  private  logsiticinserthead: FormGroup;

  @Input()
  public saveform: FormGroup;


  constructor( private fb: FormBuilder,
               private dialog: MatDialog,
               public emitService: EmitService,
               private  dialogx: DialogservicesService) { }

  ngOnInit() {

    // this.logsiticinserthead =  this.fb.group({
    //   ShipmentGroupId: { value: '', disabled: true },
    //   ShipmentUserLinkTel: ''
    // });
    // first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
    this.saveform.addControl('ShipmentGroupId', new FormControl({value: '', disabled: true}));
    this.saveform.addControl('PriceBlaceMethod', new FormControl());



    this.saveform.addControl('CarringToolId', new FormControl({value: '', disabled: true}, Validators.required));
    this.saveform.addControl('CarryingToolName', new FormControl({value: '', disabled: false}, Validators.required));
    this.saveform.addControl('ShipmentUserId', new FormControl({value: '', disabled: true}, Validators.required));
    this.saveform.addControl('ShipmentUserDesc', new FormControl({value: '', disabled: false}, Validators.required));

    this.saveform.addControl('ShipmentUserLinkTel', new FormControl());

    this.saveform.addControl('SendOrderCount', new FormControl(0));
    this.saveform.addControl('SendOrderWeight', new FormControl(0));
    this.saveform.addControl('SendOrderVol', new FormControl(0));

    this.saveform.addControl('Mark', new FormControl());
  }

  /**
   * 车辆选择
   */
  selectvehicel($event: MouseEvent, height: string, width: string) {

    const dialogRef = this.dialog.open(SelectvehicelComponent, {
      height: height,
      width: width,
      disableClose: false,
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {



    });


  }

  /**
   * 司机选择
   */
  selectdriver($event: MouseEvent, height: string, width: string) {
    const dialogRef = this.dialog.open(SelectdriverComponent, {
      height: height,
      width: width,
      disableClose: false,
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {



    });
  }
}
