import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {LogisticStoreAuthorizeServiceService} from '../../../../../services/logisticstore/logistic-store-authorize-service.service';
import {LogisticStore} from '../../../../../models/LogisticStore/logistic-store';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';
import {MatSelect} from '@angular/material';

@Component({
  selector: 'app-biz-mylogistiscstore2',
  templateUrl: './mylogistiscstore2.component.html',
  styleUrls: ['./mylogistiscstore2.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: Mylogistiscstore2Component
    }
  ]
})
export class Mylogistiscstore2Component implements OnInit , ControlValueAccessor {

  logistticstores: LogisticStore[];

  @Input()
  placeholder: string;


  @ViewChild('mystore')
  mystoredownlist: MatSelect;

  onChange;

  constructor(private logisticStoreAuthorizeServiceService: LogisticStoreAuthorizeServiceService) { }

  ngOnInit() {


    this.logisticStoreAuthorizeServiceService.MyStores().subscribe( (value: LogisticStore[]) => {

      this.logistticstores = value;

    });

  }

  writeValue(value: any) {

    this.mystoredownlist.writeValue(value);

  }

  registerOnTouched(fn: any): void {
    if (fn != null) {
      this.mystoredownlist.registerOnTouched(fn);
      this.onChange = fn;
    }
  }
  registerOnChange(fn) {
    console.log('registerOnChange');
    if (fn != null) {
      this.mystoredownlist.registerOnChange(fn);
      this.onChange = fn;
    }
  }
}
