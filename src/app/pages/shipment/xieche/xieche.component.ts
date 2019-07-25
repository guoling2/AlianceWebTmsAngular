import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {MatDialog} from '@angular/material';
import {Commonsetting} from '../../../help/commonsetting';
import {Basereportconfig} from '../../../services/base/basereportconfig';
import {Basereportservice} from '../../../services/base/basereportservice';

@Component({
  selector: 'app-xieche',
  templateUrl: './xieche.component.html',
  styleUrls: ['./xieche.component.css']
})
export class XiecheComponent implements OnInit {
  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;
  constructor(private fb: FormBuilder, private service: Basereportservice  ) { }

  ngOnInit() {
    this.searchp = this.fb.group(
      { OrderTrackServerId: '', myselectstore: '', PlanStatuedId: 10, XiehuoType: 1});
    this.gridheight = Commonsetting.GridHeight();
  }

  searching () {
    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage;
    searchable.pagesize = pagesetting.pageSize;

    // <option value="1">本地卸车</option>
    //   <option value="2">中转卸车</option>
    let  seelctreport ;

    switch ( searchable.XiehuoType) {

      case '1':
        seelctreport = Basereportconfig.Report_wuliuxieche;
        break;
      case  '2':
        seelctreport = Basereportconfig.Report_wuliuxiecheFortransfer;
        break;
      default:
        seelctreport = Basereportconfig.Report_wuliuxieche;
        break;
    }


    this.service.SearchReport(seelctreport, searchable).subscribe(result => {

      this.grid.dataSource = result;

    });
  }

  dataStateChange ( $event ) {
    this.searching();
  }

  excelout () {
    this.grid.excelExport();
  }
}
