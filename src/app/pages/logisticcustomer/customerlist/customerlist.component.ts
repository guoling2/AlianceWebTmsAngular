import {Component, OnInit, ViewChild} from '@angular/core';
import {DataStateChangeEventArgs} from '@syncfusion/ej2-grids';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {Basereportservice} from '../../../services/base/basereportservice';
import {Commonsetting} from '../../../help/commonsetting';
import {Basereportconfig} from '../../../services/base/basereportconfig';

@Component({
  selector: 'app-biz-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;

  constructor(private service: Basereportservice, private fb: FormBuilder) { }

  ngOnInit() {
    this.searchp = this.fb.group(
      { Name: '', Simplename: '', Code: ''});
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

    this.service.SearchReport(Basereportconfig.Report_customerprofilelist, searchable).subscribe(result => {

      this.grid.dataSource = result;

    }); }
}
