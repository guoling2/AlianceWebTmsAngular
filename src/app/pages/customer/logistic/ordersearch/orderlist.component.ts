import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {Basereportservice} from '../../../../services/base/basereportservice';
import {Commonsetting} from '../../../../help/commonsetting';
import {Basereportconfig} from '../../../../services/base/basereportconfig';
import { DataStateChangeEventArgs, PageEventArgs} from '@syncfusion/ej2-angular-grids';
import {OrderflowmessagComponent} from '../../../common/orderflow/orderflowmessag.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;
  constructor(private fb: FormBuilder, private service: Basereportservice, public dialog: MatDialog) {  }

  ngOnInit() {
    this.searchp = this.fb.group(
      { OrderTrackServerId: '', OrderStatusId: ''});
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

    console.log(pagesetting);
    this.service.SearchReport(Basereportconfig.Report_customerorderlist, searchable).subscribe(result => {

      console.log(result);
      this.grid.dataSource = result;

    }); }

  opentrackmessage ( OrderTrackNumber: string ) {

    if ( OrderTrackNumber == undefined ) {
      return;
    }
    this.dialog.open(OrderflowmessagComponent, {
      width: '450px',
      disableClose: false,
      data: OrderTrackNumber
    });
  }
}
