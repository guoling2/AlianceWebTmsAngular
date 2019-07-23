import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CustomePaymentMethod} from '../../../modeldata/customePaymentMethod';
import {ChangeEventArgs, DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import {CargoReceiptPaperShowType} from '../../../modeldata/cargoReceiptPaperShowType';

@Component({
  selector: 'app-bin-cargoreceiptpapershowtype',
  templateUrl: './cargo-receipt-paper-show-type.component.html',
  styleUrls: ['./cargo-receipt-paper-show-type.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CargoReceiptPaperShowTypeComponent
    }
  ]
})
export class CargoReceiptPaperShowTypeComponent implements OnInit, ControlValueAccessor {


  public logisticstorefiled: Object = CargoReceiptPaperShowType.filed;

  logistticstores: Object[] = CargoReceiptPaperShowType.Data;

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
    this.mystoredownlist.value = value;
  }

  selectchange (event: ChangeEventArgs) {


    this.onChange(event.value);
    console.log(event.value);
    // this.onChange(event.value);

  }


}
