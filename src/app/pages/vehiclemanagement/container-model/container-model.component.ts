import {Component, OnInit, ViewChild} from '@angular/core';
import {VehicleContainerService} from '../../../services/vehiclemanagement/vehicle-container.service';
import {DataStateChangeEventArgs} from '@syncfusion/ej2-grids';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Commonsetting} from '../../../help/commonsetting';
import {Basereportconfig} from '../../../services/base/basereportconfig';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {GridDataSource} from '../../../models/grid-data-source';

@Component({
  selector: 'app-container-model',
  templateUrl: './container-model.component.html',
  styleUrls: ['./container-model.component.css']
})
export class ContainerModelComponent implements OnInit {
  gridheight: number;
  searchp: FormGroup;
  @ViewChild('grid', {static: false})
  public grid: GridComponent;
  constructor(private fb: FormBuilder, private vehicleContainerService: VehicleContainerService) { }

  ngOnInit() {
    this.searchp = this.fb.group(
      { Name: '', Code: ''});
    this.gridheight = Commonsetting.GridHeight();
  }

  searching () {

    const  pagesetting = this.grid.pageSettings;
    const searchable = this.searchp.getRawValue ();
    searchable.pageindex = pagesetting.currentPage;
    searchable.pagesize = pagesetting.pageSize;

    this.vehicleContainerService.Search(searchable).subscribe(result => {

      console.log( result);
      this.grid.dataSource = new GridDataSource(result);
      // {
      //   count: result.TotalCount,
      //   result: result.QueryResult
      // };

    }); }

     dataStateChange($event: DataStateChangeEventArgs) {

      this.searching();
    }
}
