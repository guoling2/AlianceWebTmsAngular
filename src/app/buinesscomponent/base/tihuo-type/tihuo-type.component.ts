import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
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

  constructor() { }

  public logisticstorefiled: Object = TihuoType.DropDownListField;

  logistticstores: Object[] = TihuoType.Data;

  @Input()
  placeholder: string;
  @ViewChild('mystore', {static: true})
  mystoredownlist: DropDownListComponent;
  onChange;

  private _composing;
  private _compositionMode;
  private _elementRef;
  private _renderer;
  onTouched: () => void;

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

    console.log(value);
   // this.mystoredownlist.text=value;
    // this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
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
