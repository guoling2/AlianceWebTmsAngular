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
  @ViewChild('grid')
  public grid: GridComponent;
  constructor(private fb: FormBuilder, private service: Basereportservice  ) { }

  ngOnInit() {
    this.searchp = this.fb.group(
      { OrderTrackServerId: '', myselectstore: '', PlanStatuedId: 10});
    this.gridheight = Commonsetting.GridHeight();
  }

  searching () {
    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage;
    searchable.pagesize = pagesetting.pageSize;

    this.service.SearchReport(Basereportconfig.Report_wuliuxieche, searchable).subscribe(result => {

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
