import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { BusAreaEntity } from '../../../models/base/busareaEntity';
import { HttpClient } from '@angular/common/http';
import {DropDownListComponent, SelectEventArgs} from '@syncfusion/ej2-angular-dropdowns';
import {Query} from '@syncfusion/ej2-data';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-bin-areacascading',
  templateUrl: './areacascading.component.html',
  styleUrls: ['./areacascading.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AreacascadingComponent
    }
  ]
})
export class AreacascadingComponent implements OnInit, ControlValueAccessor {

  onChange;
  public country: { [key: string]: Object }[] = [];
  public state: { [key: string]: Object }[] = [];
  public cities: { [key: string]: Object }[] = [];
  // maps the country columns to fields property
  public countryFields: Object = { value: 'AreaID', text: 'AreaNameDesc' };
  // maps the state columns to fields property
  public stateFields: Object = { value: 'AreaID', text: 'AreaNameDesc' };
  // maps the city columns to fields property
  public cityFields: Object = { value: 'AreaID', text: 'AreaNameDesc' };
  // set the placeholder to DropDownList input element
  public countryWaterMark = '选择省';
  public stateWaterMark = '选择市';
  public cityWaterMark = '选择区';
  @ViewChild('countryList', {static: true})
  // country DropDownList instance
  public countryObj: DropDownListComponent;
  @ViewChild('stateList', {static: true})
  // state DropDownList instance
  public stateObj: DropDownListComponent;
  @ViewChild('cityList', {static: true})
  // city DropDownList instance
  public cityObj: DropDownListComponent;

  @Output() SelctCountry = new EventEmitter<BusAreaEntity>();

  @Output() SelctState = new EventEmitter<BusAreaEntity>();

  @Output() SelctCity = new EventEmitter<BusAreaEntity>();


  constructor(private http: HttpClient) { }

  ngOnInit() {

    // 加载省数据
    this.http
      .get<BusAreaEntity[]>('assets/data/province.json')
      .subscribe((value: BusAreaEntity[]) => {
        value.forEach((a, index) => {
          this.country.push({ AreaID: a.AreaID, AreaNameDesc: a.AreaNameDesc, ParentCode: a.ParentCode });
        });
      });
    // 加载市数据
    this.http
      .get<BusAreaEntity[]>('assets/data/city.json')
      .subscribe((value: BusAreaEntity[]) => {
        value.forEach((a, index) => {
          this.state.push({ AreaID: a.AreaID, AreaNameDesc: a.AreaNameDesc, ParentCode: a.ParentCode });
        });
      });
    // 加载区数据
    this.http
      .get<BusAreaEntity[]>('assets/data/area.json')
      .subscribe((value: BusAreaEntity[]) => {
        value.forEach((a, index) => {
          this.cities.push({ AreaID: a.AreaID, AreaNameDesc: a.AreaNameDesc, ParentCode: a.ParentCode });
        });
      });

  }

  onChange1($event: SelectEventArgs) {

    this.SelctCountry.emit($event.itemData as BusAreaEntity);

    this.stateObj.enabled = true;
    // query the data source based on country DropDownList selected value
   // alert(this.countryObj.value);
    const tempQuery: Query = new Query().where('ParentCode', 'equal', this.countryObj.value);
    this.stateObj.query = tempQuery;
    // clear the existing selection.
    this.stateObj.text = null;
    // bind the property changes to state DropDownList
    this.stateObj.dataBind();
    // clear the existing selection.
    this.cityObj.text = null;
    this.cityObj.enabled = false;
    // bind the property changes to city DropDownList
    this.cityObj.dataBind();
  }

  onChange2($event: SelectEventArgs) {

    this.SelctState.emit($event.itemData as BusAreaEntity);

    this.cityObj.enabled = true;
    // query the data source based on state DropDownList selected value
    const tempQuery1: Query = new Query().where('ParentCode', 'equal', this.stateObj.value);
    this.cityObj.query = tempQuery1;
    // clear the existing selection.
    this.cityObj.text = null;
    // bind the property changes to city DropDownList
    this.cityObj.dataBind();
  }
  onChange3($event: SelectEventArgs) {

   const  model = $event.itemData as BusAreaEntity;

    this.SelctCity.emit(model);

    console.log('区域选择this.onChange3()');
    console.log(model);
    if (model !== undefined) {
      const  areanames = model.AreaNameDesc;

      this.onChange(areanames);
    }

  }

  registerOnChange(fn: any): void {

    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.countryObj.setDisabledState(isDisabled);
    this.stateObj.setDisabledState (isDisabled);
    this.cityObj.setDisabledState(isDisabled);
  }

  writeValue(value: any): void {
    if (value) {



      this.countryObj.setDisabledState(false);
      this.stateObj.setDisabledState (false);
      this.cityObj.setDisabledState(false);
     const inputdate = value.toString().split(',');

     this.countryObj.text = inputdate[0];

     this.stateObj.text = inputdate[1];
     this.cityObj.index = 0;
      console.log(inputdate[2]);
    }

  }


}
