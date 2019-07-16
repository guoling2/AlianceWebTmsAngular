import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {StoreLeave} from '../../../modeldata/storeleave';
import {ChangeEventArgs, DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'app-bin-storeleave',
  templateUrl: './storeleave.component.html',
  styleUrls: ['./storeleave.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: StoreleaveComponent
    }
  ]
})
export class StoreleaveComponent implements OnInit , ControlValueAccessor{

  datasource: Object[] = StoreLeave.Data;

  dropfiled: Object = StoreLeave.DropDownListField;

  @Input()
  placeholder: string;
  @Input()
  FirstIsSelect = false;

  @ViewChild('dropname', {static: false})
  mystoredownlist: DropDownListComponent;
  onChange;

  constructor() { }

  ngOnInit() {
      if (this.FirstIsSelect) {
        this.mystoredownlist.index=0;
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
