import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TihuoType} from '../../../modeldata/tihuotypedata';
import {ChangeEventArgs, DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import {YunshuxingzhiData} from '../../../modeldata/yunshuxingzhidata';

@Component({
  selector: 'app-bin-yunshuxingzhi',
  templateUrl: './yunshuxingzhi.component.html',
  styleUrls: ['./yunshuxingzhi.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: YunshuxingzhiComponent
    }
  ]
})
export class YunshuxingzhiComponent implements OnInit , ControlValueAccessor {

  public logisticstorefiled: Object = YunshuxingzhiData.DropDownListField;

  public logistticstores: Object[] = YunshuxingzhiData.Data;

  @Input()
  placeholder: string;
  @ViewChild('mystore', {static: true})
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

      this.mystoredownlist.value = value;
    }

  }

  selectchange(event: ChangeEventArgs) {


    this.onChange(event.value);
    console.log(event.value);
    // this.onChange(event.value);

  }

}
