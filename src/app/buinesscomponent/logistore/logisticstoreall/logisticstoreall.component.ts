import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LogisticStoreServiceService} from '../../../services/logisticstore/logisticstoreservice';
import {LogisticStore} from '../../../models/LogisticStore/logistic-store';
import {ChangeEventArgs, DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-bin-logisticstoreall',
  templateUrl: './logisticstoreall.component.html',
  styleUrls: ['./logisticstoreall.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: LogisticstoreallComponent
    }
  ]
})
export class LogisticstoreallComponent implements OnInit, ControlValueAccessor {


  @Input()
  placeholder: string;

  @Input()
  disabled: boolean;

  @ViewChild('store', {static: true})
  mystoredownlist: DropDownListComponent;

  onChange;

  public logistticstores: LogisticStore[]|any;

  public logisticstorefiled: Object = { text: 'StoreName', value: 'StoreId' };


  constructor(private logisticStoreServiceService: LogisticStoreServiceService) { }

  ngOnInit() {

    // this.mystoredownlist.enabled = this.disabled;

    this.logisticStoreServiceService.StoreQuery().subscribe((value: LogisticStore[]) => {this.logistticstores = value; });
  }

  writeValue(value: any) {

    console.log('writeValueLogisticstoreallComponent');
    console.log(value);
    if (value) {

      this.mystoredownlist.writeValue(value);
    } else {
      this.mystoredownlist.writeValue(value);
    }

  }

  registerOnChange(fn) {
    console.log('registerOnChange');
    this.onChange = fn;
  }

  registerOnTouched(fn) {
  //  this.onChange = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.mystoredownlist.setDisabledState(isDisabled);
  }

  selectchange (event: ChangeEventArgs) {

    console.log('我改变了');
    console.log(event.value);
    this.onChange(event.value);

    // this.onChange(event.value);

  }

}
