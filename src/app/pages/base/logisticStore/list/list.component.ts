import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {MatDialog} from '@angular/material';
import {Commonsetting} from '../../../../help/commonsetting';
import {LogisticstoreService} from '../../../../services/base/logisticstore.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;
  constructor( private fb: FormBuilder, public dialog: MatDialog, public logisticstoreService: LogisticstoreService ) { }

  ngOnInit() {
    this.searchp = this.fb.group(
      { SearchText: ''});
    this.gridheight = Commonsetting.GridHeight();
  }

  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
   // searchable.pageindex = pagesetting.currentPage;
   // searchable.pagesize = pagesetting.pageSize;

    console.log(searchable);
    this.logisticstoreService.Search(searchable).subscribe(result => {
      this.grid.dataSource = result; });
  }

  dataStateChange ( $event ) {
    this.searching();
  }
}
