import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {
  CheckBoxChangeEventArgs,
  DataStateChangeEventArgs,
  GridComponent,
  PageSettingsModel, RowDeselectEventArgs,
  RowSelectEventArgs,
  SelectionSettingsModel
} from '@syncfusion/ej2-angular-grids';
import {BehaviorSubject} from 'rxjs';
import {GroupOrderAtionModel} from '../groupforInside/group-order-ation-model';
import {ShipplanService} from '../../../services/logistic/shipment/shipplan.service';
import {DialogservicesService} from '../../../help/dialogservices.service';
import {MyShpipmentOrderService} from '../../../services/logistic/shipment/myshpipmentorderService';
import {EmitService} from '../../../help/emit-service';
import {MatDialog} from '@angular/material';
import {Basereportservice} from '../../../services/base/basereportservice';
import {Commonsetting} from '../../../help/commonsetting';
import {Basereportconfig} from '../../../services/base/basereportconfig';
import {UpdateModelType} from '../../../models/tms-data-entity';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-biz-sendsonghuolist',
  templateUrl: './sendsonghuolist.component.html',
  styleUrls: ['./sendsonghuolist.component.css']
})
export class SendsonghuolistComponent implements OnInit {

  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;
  public pageSettings: PageSettingsModel;
  tabselected = new FormControl(0);
  public selectOptions: SelectionSettingsModel;

  orderStoreSubject: BehaviorSubject<GroupOrderAtionModel> = new BehaviorSubject<GroupOrderAtionModel>(null);

  public alreadyloadshipmentdatasource: GroupOrderAtionModel[] = [];

  public  Title: string;

  @Input()
  public taskType: string;


  constructor(
              private route: ActivatedRoute,
              private  shipplanService: ShipplanService,
              private  dialogx: DialogservicesService,
              private  myShpipmentOrderService: MyShpipmentOrderService,
              public emitService: EmitService, private fb: FormBuilder, public dialog: MatDialog, private service: Basereportservice) { }

  ngOnInit() {


    this.selectOptions = { persistSelection: true };

    this.pageSettings = {pageSize: 50};
    // this.grid.pageSettings.pageSize = 100;
    this.searchp = this.fb.group(
      { OrderTrackServerId: '', PlanStatuedId: '', TaskType: this.taskType});
    this.gridheight = Commonsetting.GridHeight3();


    switch ( this.taskType) {
      case 'songhuo': // 网点送货
        this.Title = '网点送货';
        break;
      case 'transfer': // 网点转运
        this.Title = '网点转运';
        break;
      case 'circletriptrip': // 大车直送
        this.Title = '大车直送';
        break;
      case 'outer':  // 中转外包
        this.Title = '中转外包';
        break;
      default:
        break;
    }

    this.searchp.patchValue({TaskType: this.taskType});


    this.searching();

    // this.grid.pageSettings={currentPage:1,pageSize:2};
  }

  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage;
    searchable.pagesize = pagesetting.pageSize;

    this.service.SearchReport(Basereportconfig.Report_senditemlist, searchable).subscribe(result => {

      this.grid.dataSource = result;
      console.log('加载数据了');

    });
  }


  dataStateChange($event: DataStateChangeEventArgs) {

    console.log('dataStateChange');

    console.log($event);
    if ($event.action.requestType === 'paging') {
      this.searching();
    }


  }

  opentihuo() {

    const selectedrows =  this.grid.getSelectedRecords();

    if (selectedrows.length === 0) {
      return;
    }
    this.tabselected.setValue(1);

    for (let index = 0; index < selectedrows.length; index++) {

      const element = selectedrows[index];

      const  x = this.alreadyloadshipmentdatasource[element['ShipmentId']];

      if (x == null) {

        this.orderStoreSubject.next({ShipmentId: element['ShipmentId'], UpdateModelType: UpdateModelType.Attach});
      }

    }


  }

  rowselected($event: RowSelectEventArgs) {



    console.log('加载了rowselected');

    console.log($event);

    if ($event.data === undefined) {
      return;
    }
    // this.orderStoreSubject.next({ShipmentId: $event.data['ShipmentId'], UpdateModelType: UpdateModelType.Attach});

    const shipmentId = $event.data['ShipmentId'];

    console.log(shipmentId);

    const storeshipment = this.alreadyloadshipmentdatasource.findIndex(t => t.ShipmentId === shipmentId);


    console.log(storeshipment);

    if (storeshipment === -1) {
      this.alreadyloadshipmentdatasource.push({ShipmentId:  $event.data['ShipmentId'], UpdateModelType: UpdateModelType.Attach});
    } else {
      console.log('已经添加了');
    }

  }

  rowdeselection($event: RowDeselectEventArgs) {

    const shipmentOrderId = $event.data[0]['ShipmentId'];

    const index = this.alreadyloadshipmentdatasource.findIndex(t => t.ShipmentId === shipmentOrderId);

    if (index !== -1) {
      this.alreadyloadshipmentdatasource.splice(index, 1);
    }
  }

  checkboxchanged($event: CheckBoxChangeEventArgs) {




    console.log($event);

    const selectredord = [];


    this.grid.getSelectedRecords().forEach(a => {

      selectredord.push(a['ShipmentId']);
    });


    if ($event.checked === false) {

      if ($event.selectedRowIndexes.length === 0) {
        this.alreadyloadshipmentdatasource = [];
      }
      const deleteindex = [];


      this.alreadyloadshipmentdatasource.forEach((item, index) => {

        if (selectredord.findIndex(a => a === item.ShipmentId) === -1) {
          deleteindex.push(index);
        }
      });

      if (deleteindex.length !== 0) {
        deleteindex.forEach(a => {
          this.alreadyloadshipmentdatasource.splice(a, 1);
        });
      }

    } else {

      const addindexs = [];

      selectredord.forEach(a => {

        const add = this.alreadyloadshipmentdatasource.findIndex(t => t.ShipmentId === a);

        if (add === -1) {
          addindexs.push(a);
        }

      });

      if (addindexs.length > 0) {

        addindexs.forEach(a => {
          if ( this.alreadyloadshipmentdatasource.findIndex(t => t.ShipmentId === a) === -1) {
            this.alreadyloadshipmentdatasource.push({ShipmentId: a, UpdateModelType: UpdateModelType.Attach });
          }

        });

      }
    }

    console.log(this.alreadyloadshipmentdatasource);
  }

}
