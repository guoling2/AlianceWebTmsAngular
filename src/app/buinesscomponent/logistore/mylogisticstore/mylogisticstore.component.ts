import {Component, forwardRef, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ej} from '@syncfusion/ej2-inputs/dist/global';
import {LogisticStore} from '../../../models/LogisticStore/logistic-store';
import {LogisticStoreAuthorizeServiceService} from '../../../services/logisticstore/logistic-store-authorize-service.service';
import {ChangeEventArgs, DropDownListComponent, SelectEventArgs} from '@syncfusion/ej2-angular-dropdowns';
import {
  ControlValueAccessor, DefaultValueAccessor,
  FormControl,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgForm,
  SelectControlValueAccessor
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {filterMenuClose} from '@syncfusion/ej2-grids';


@Component({
  selector: 'app-bin-mylogisticstore',
  templateUrl: './mylogisticstore.component.html',
  styleUrls: ['./mylogisticstore.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: MylogisticstoreComponent
    }
  ]
})
export class MylogisticstoreComponent implements OnInit, ControlValueAccessor   {

  public logisticstorefiled: Object = { text: 'StoreName', value: 'StoreId' };

  logistticstores: LogisticStore[]|any;


  @Input()
  placeholder: string;

  @Output()
  selectstore: LogisticStore;



  @ViewChild('mystore', {static: false})
  mystoredownlist: DropDownListComponent;


  onChange;
  constructor( private logisticStoreAuthorizeServiceService: LogisticStoreAuthorizeServiceService,
               public _parentFormGroup: FormGroupDirective, private renderer: Renderer2) {
     console.log(_parentFormGroup);

  }

  ngOnInit() {

    console.log();


    this.logisticStoreAuthorizeServiceService.MyStores().subscribe( (value: LogisticStore[]) => {

      this.logistticstores = value;
      this.mystoredownlist.index = 0;

      this.selectstore = this.logistticstores[0];
    });
  }

  writeValue(value: any) {

    console.log('writeValue');
    console.log(value);
    if (value) {


    }

  }

  registerOnChange(fn) {
    console.log('registerOnChange');
    if(fn!=null){
      this.onChange = fn;
    }

  }

  registerOnTouched() {}


  selectchange (event: ChangeEventArgs) {
    this.selectstore = event.previousItemData as LogisticStore;
     if ( this.onChange != null ) {
      this.onChange(event.value);
    }
     console.log(event.value);
    //this.onChange(event.value);

  }
}
