import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Vehicelmodel} from '../../../../../models/vehiclemanagement/vehicelmodel';
import {FormBuilder, FormGroup} from '@angular/forms';

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
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<SelectvehicelComponent>,
              @Inject(MAT_DIALOG_DATA) public parameter: string) { }

  ngOnInit() {
    this.form = this.fb.group({
      VehicelName: '' ,
      Volumecapacity: '',
      Weightcapacity: ''
    });
  }

  search() {

    this.customeraddressdatasource = [
      // tslint:disable-next-line:max-line-length
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2},
      { VehicelId: '1', VehicelName: '鲁F123456', StatuedDesc: '闲置', PrimaryDriverName: '郭亮', PrimaryDriverId: '12346', ContainerModelName: '2米3吨', Volumecapacity: 1, Weightcapacity: 2}
      ];
    this.pageindex = 0;
    this.pagelength = 25;
  }

  chosevehicel(element: Vehicelmodel) {

  }

  close() {
    this.dialogRef.close();
  }
}
