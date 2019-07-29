import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {DataStateChangeEventArgs, PageSettingsModel, RowSelectEventArgs} from '@syncfusion/ej2-grids';
import {GridDataSource} from '../../../models/grid-data-source';
import {Commonsetting} from '../../../help/commonsetting';
import {Basereportconfig} from '../../../services/base/basereportconfig';
import {ShipplanService} from '../../../services/logistic/shipment/shipplan.service';
import {DialogservicesService} from '../../../help/dialogservices.service';
import {MyShpipmentOrderService} from '../../../services/logistic/shipment/myshpipmentorderService';
import {EmitService} from '../../../help/emit-service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {Basereportservice} from '../../../services/base/basereportservice';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {timeSinceInMicros} from '@angular/compiler-cli/src/ngtsc/perf/src/clock';
import {BehaviorSubject} from 'rxjs';
import {GroupOrderAtionModel} from '../groupforInside/group-order-ation-model';
import { UpdateModelType } from 'src/app/models/tms-data-entity';

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
  public pageSettings: PageSettingsModel;
  tabselected = new FormControl(0);


  orderStoreSubject: BehaviorSubject<GroupOrderAtionModel> = new BehaviorSubject<GroupOrderAtionModel>(null);

  constructor(private  shipplanService: ShipplanService,
              private  dialogx: DialogservicesService,
              private  myShpipmentOrderService: MyShpipmentOrderService,
              public emitService: EmitService, private fb: FormBuilder, public dialog: MatDialog, private service: Basereportservice) { }

  ngOnInit() {
    this.pageSettings={pageSize:3};
   // this.grid.pageSettings.pageSize = 100;
    this.searchp = this.fb.group(
      { OrderTrackServerId: '', PlanStatuedId: ''});
    this.gridheight = Commonsetting.GridHeight();
    //this.grid.pageSettings={currentPage:1,pageSize:2};
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

  opentihuo() {

    const selectedrows =  this.grid.getSelectedRecords();

    if (selectedrows.length==0){
      return;
    }
    this.tabselected.setValue(1);

    for (let index = 0; index < selectedrows.length; index++) {

      const element = selectedrows[index];

      this.orderStoreSubject.next({ShipmentId:element['ShipmentId'],UpdateModelType:UpdateModelType.Attach});
    }


  }

  senditemselected($event: RowSelectEventArgs) {

    console.log($event);
  }
}
