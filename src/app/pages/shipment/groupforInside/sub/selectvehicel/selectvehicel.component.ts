import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, PageEvent} from '@angular/material';
import {Vehicelmodel} from '../../../../../models/vehiclemanagement/vehicelmodel';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseVehicelServiceService} from '../../../../../services/vehiclemanagement/base-vehicel-service.service';
import {PageQueryResult} from '../../../../../models/page-query-result';

@Component({
  selector: 'app-selectvehicel',
  templateUrl: './selectvehicel.component.html',
  styleUrls: ['./selectvehicel.component.css']
})
export class SelectvehicelComponent implements OnInit {


  public form: FormGroup;

  displayedColumns: string[] = ['VehicelId', 'VehicelName', 'StatuedDesc', 'PrimaryDriverName', 'ContainerModelName', 'Volumecapacity', 'Weightcapacity'];

  public displaytithle = '';
  public pageindex = 0;
  public  pagelength = 0;

  customeraddressdatasource: Vehicelmodel[] = [];

  constructor(
              private vehicelServiceService: BaseVehicelServiceService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<SelectvehicelComponent>,
              @Inject(MAT_DIALOG_DATA) public parameter: string) { }

  ngOnInit() {
    this.form = this.fb.group({
      vehicelName: '' ,
      weightcapacity: '',
      volumecapacity: '',
      pageindex: this.pageindex,
      pagesize: 50
    });
  }

  search(pageindex: number) {

    this.form.patchValue({pageindex: pageindex+1});

    this.vehicelServiceService.Search(this.form.getRawValue()).subscribe((a: PageQueryResult<Vehicelmodel[]>) => {
      this.customeraddressdatasource = a.QueryResult;
      this.pagelength = a.TotalCount;
       this.pageindex = a.PageIndex -1;
    });

  }

  chosevehicel(element: Vehicelmodel) {

    this.dialogRef.close(element);
  }

  close() {
    this.dialogRef.close();
  }

  changepage($event: PageEvent) {
    this.search( $event.pageIndex);
  }
}
