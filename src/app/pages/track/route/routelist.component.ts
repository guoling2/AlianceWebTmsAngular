import {Component, OnInit, ViewChild} from '@angular/core';
import {Commonsetting} from '../../../help/commonsetting';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Basereportservice} from '../../../services/base/basereportservice';
import {Basereportconfig} from '../../../services/base/basereportconfig';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import { DataStateChangeEventArgs, PageEventArgs} from '@syncfusion/ej2-angular-grids';
import {DialogservicesService} from '../../../help/dialogservices.service';
import {DelegateorderComponent} from '../../shipment/list/command/delegateorder/delegateorder.component';
import {OrderflowmessagComponent} from '../../common/orderflow/orderflowmessag.component';
import {MatDialog} from '@angular/material';
import {DialogAlertComponent} from '../../../component/tms/alert';
@Component({
  selector: 'app-routelist',
  templateUrl: './routelist.component.html',
  styleUrls: ['./routelist.component.css']
})
export class RoutelistComponent implements OnInit {
  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;
  constructor( private fb: FormBuilder, private service: Basereportservice, public dialog: MatDialog) {  }

  ngOnInit() {

    this.searchp = this.fb.group(
      { IsSign: '0'});
    this.gridheight = Commonsetting.GridHeight();
  }

  public  dataStateChange(datastate: DataStateChangeEventArgs): void {

    this.searching();
  }
  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage;
    searchable.pagesize = pagesetting.pageSize;

    this.service.SearchReport(Basereportconfig.Report_logisticroutingtrack, searchable).subscribe(result => {

      this.grid.dataSource = result;

    }); }

  opentrackmessage ( OrderTrackNumber: string ) {
    this.dialog.open(OrderflowmessagComponent, {
      width: '250px',
      disableClose: false,
      data: OrderTrackNumber
    });
  }
}
