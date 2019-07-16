import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomePaymentMethod } from '../../../modeldata/customePaymentMethod';
import { ChangeEventArgs, DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { TihuoType } from 'src/app/modeldata/tihuotypedata';

@Component({
  selector: 'app--bin-tihuotype',
  templateUrl: './tihuo-type.component.html',
  styleUrls: ['./tihuo-type.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TihuoTypeComponent
    }
  ]
})
export class TihuoTypeComponent implements OnInit, ControlValueAccessor {

  public logisticstorefiled: Object = TihuoType.DropDownListField;

  logistticstores: Object[] = TihuoType.Data;

  @Input()
  placeholder: string;
  @ViewChild('mystore', {static: false})
  mystoredownlist: DropDownListComponent;
  onChange;

  constructor() { }

  ngOnInit() {
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

      this.mystoredownlist.writeValue(value);
    } else {
      this.mystoredownlist.writeValue(value);
    }

  }

  selectchange(event: ChangeEventArgs) {


    this.onChange(event.value);
    console.log(event.value);
    // this.onChange(event.value);

  }

}
