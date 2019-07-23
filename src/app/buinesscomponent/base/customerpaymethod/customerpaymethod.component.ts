import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ChangeEventArgs, DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import {LogisticStore} from '../../../models/LogisticStore/logistic-store';
import {CustomePaymentMethod} from '../../../modeldata/customePaymentMethod';

@Component({
  selector: 'app-bin-customerpaymethod',
  templateUrl: './customerpaymethod.component.html',
  styleUrls: ['./customerpaymethod.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CustomerpaymethodComponent
    }
  ]
})
export class CustomerpaymethodComponent implements OnInit, ControlValueAccessor {

  public logisticstorefiled: Object = CustomePaymentMethod.filed;

  logistticstores: Object[] = CustomePaymentMethod.Data;

  @Input()
  placeholder: string;
  @ViewChild('mystore', {static: true})
  mystoredownlist: DropDownListComponent;
  onChange;
  constructor() { }

  ngOnInit() {


  }

  registerOnChange ( fn: any ): void {

    this.onChange = fn;
  }

  registerOnTouched ( fn: any ): void {
  }

  setDisabledState ( isDisabled: boolean ): void {
    this.mystoredownlist.setDisabledState(isDisabled);
  }

  writeValue ( value: any ): void {

    if (value) {

      this.mystoredownlist.writeValue(value);
    } else {
      this.mystoredownlist.writeValue(value);
    }

  }

  selectchange (event: ChangeEventArgs) {


    this.onChange(event.value);
    console.log(event.value);
    // this.onChange(event.value);

  }

}
