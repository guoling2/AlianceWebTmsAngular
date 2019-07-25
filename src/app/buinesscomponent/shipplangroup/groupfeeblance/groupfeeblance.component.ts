import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ChangeEventArgs, DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import {ShipmentPlanOrderPriceBlace} from '../../../modeldata/shipment-plan-order-price-blace';

@Component({
  selector: 'app-biz-groupfeeblance',
  templateUrl: './groupfeeblance.component.html',
  styleUrls: ['./groupfeeblance.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: GroupfeeblanceComponent
    }
  ]
})
export class GroupfeeblanceComponent implements OnInit, ControlValueAccessor {


  datasource: Object[] = ShipmentPlanOrderPriceBlace.Data;

  dropfiled: Object = ShipmentPlanOrderPriceBlace.DropDownListField;

  @Input()
  placeholder: string;
  @Input()
  FirstIsSelect = false;

  @ViewChild('dropname', {static: true})
  mystoredownlist: DropDownListComponent;
  onChange;

  constructor() { }

  ngOnInit() {
    if (this.FirstIsSelect) {
      this.mystoredownlist.index = 0;
    }
  }

  registerOnChange(fn: any): void {

    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.mystoredownlist.setDisabledState(isDisabled);
  }

  writeValue(value: any): void {
    if (value) {

      this.mystoredownlist.value = value;
    }

  }

  selectchange(event: ChangeEventArgs) {


    this.onChange(event.value);
    console.log(event.value);
    // this.onChange(event.value);

  }
}
