import {Component, OnInit, ViewChild} from '@angular/core';
import {DataStateChangeEventArgs} from '@syncfusion/ej2-grids';
import {GridDataSource} from '../../../models/grid-data-source';
import {Commonsetting} from '../../../help/commonsetting';
import {Basereportconfig} from '../../../services/base/basereportconfig';
import {ShipplanService} from '../../../services/logistic/shipment/shipplan.service';
import {DialogservicesService} from '../../../help/dialogservices.service';
import {MyShpipmentOrderService} from '../../../services/logistic/shipment/myshpipmentorderService';
import {EmitService} from '../../../help/emit-service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Basereportservice} from '../../../services/base/basereportservice';
import {GridComponent} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-benditihuolist',
  templateUrl: './benditihuolist.component.html',
  styleUrls: ['./benditihuolist.component.css']
})
export class BenditihuolistComponent implements OnInit {
  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;
  constructor(private  shipplanService: ShipplanService,
              private  dialogx: DialogservicesService,
              private  myShpipmentOrderService: MyShpipmentOrderService,
              public emitService: EmitService, private fb: FormBuilder, public dialog: MatDialog, private service: Basereportservice) { }

  ngOnInit() {
   // this.grid.pageSettings.pageSize = 100;
    this.searchp = this.fb.group(
      { OrderTrackServerId: '', PlanStatuedId: ''});
    this.gridheight = Commonsetting.GridHeight();
  }

  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage;
    searchable.pagesize = pagesetting.pageSize;

    this.service.SearchReport(Basereportconfig.Report_localtihuolist, searchable).subscribe(result => {

      this.grid.dataSource = result;

    });
  }

  dataStateChange($event: DataStateChangeEventArgs) {

    this.searching();
  }

}
