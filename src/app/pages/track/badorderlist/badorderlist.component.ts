import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataStateChangeEventArgs, GridComponent} from '@syncfusion/ej2-angular-grids';
import {Commonsetting} from '../../../help/commonsetting';
import {Basereportconfig} from '../../../services/base/basereportconfig';
import {Basereportservice} from '../../../services/base/basereportservice';

@Component({
  selector: 'app-badorderlist',
  templateUrl: './badorderlist.component.html',
  styleUrls: ['./badorderlist.component.css']
})
export class BadorderlistComponent implements OnInit {
  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;
  constructor(private fb: FormBuilder, private service: Basereportservice) { }

  ngOnInit() {
    this.searchp = this.fb.group(
      { OrderTrackServerId: ''});
    this.gridheight = Commonsetting.GridHeight();
  }

  searching () {
    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage;
    searchable.pagesize = pagesetting.pageSize;

    this.service.SearchReport(Basereportconfig.Report_orderAbnormallistall, searchable).subscribe(result => {

      this.grid.dataSource = result;

    });
  }

  dataStateChange ( $event: DataStateChangeEventArgs ) {

    this.searching();
  }
}
