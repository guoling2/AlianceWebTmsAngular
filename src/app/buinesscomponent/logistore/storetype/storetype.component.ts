import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {StoreLeave} from '../../../modeldata/storeleave';
import {ChangeEventArgs, DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {StoreType} from '../../../modeldata/storetype';

@Component({
  selector: 'app-bin-storetype',
  templateUrl: './storetype.component.html',
  styleUrls: ['./storetype.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: StoretypeComponent
    }
  ]
})
export class StoretypeComponent implements OnInit, ControlValueAccessor {

  datasource: Object[] = StoreType.Data;

  dropfiled: Object = StoreType.DropDownListField;

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
