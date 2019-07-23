import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TihuoType} from '../../../modeldata/tihuotypedata';
import {ChangeEventArgs, DropDownListComponent} from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-wuliuorderstatued',
  templateUrl: './wuliuorderstatued.component.html',
  styleUrls: ['./wuliuorderstatued.component.css']
})
export class WuliuorderstatuedComponent implements OnInit {
  public logisticstorefiled: Object = TihuoType.DropDownListField;

  logistticstores: Object[] = TihuoType.Data;

  @Input()
  placeholder: string;
  @ViewChild('mystore', {static: true})
  mystoredownlist: DropDownListComponent;
  onChange;
  constructor() { }

  ngOnInit() {
  }
  selectchange(event: ChangeEventArgs) {


    this.onChange(event.value);
    console.log(event.value);
    // this.onChange(event.value);

  }
}
