import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DataStateChangeEventArgs, GridComponent} from '@syncfusion/ej2-angular-grids';
import {Commonsetting} from '../../../../help/commonsetting';
import {Basereportservice} from '../../../../services/base/basereportservice';
import {Basereportconfig} from '../../../../services/base/basereportconfig';

@Component({
  selector: 'app-nodelist',
  templateUrl: './nodelist.component.html',
  styleUrls: ['./nodelist.component.css']
})
export class NodelistComponent implements OnInit {

  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  constructor(private fb: FormBuilder, private  service: Basereportservice) {
  }

  ngOnInit() {
    this.searchp = this.fb.group(
      {BeginPointName: '', EndPointName: ''});
    this.gridheight = Commonsetting.GridHeight();
  }

  searching() {
    const pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue();
    searchable.pageindex = pagesetting.currentPage;
    searchable.pagesize = pagesetting.pageSize;

    this.service.SearchReport(Basereportconfig.Report_transportroutenodelist, searchable).subscribe(result => {

      this.grid.dataSource = result;

    });
  }

  dataStateChange($event: DataStateChangeEventArgs) {
    this.searching();
  }
}
