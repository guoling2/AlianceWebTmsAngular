import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CustomerProfileModle} from '../../../../models/customers/customer-profile-modle';
import {DialogservicesService} from '../../../../help/dialogservices.service';
import {MatDialog} from '@angular/material';
import {CustomeraddressaddComponent} from '../customeraddressadd/customeraddressadd.component';
import {CustomertaxaddComponent} from '../customertaxadd/customertaxadd.component';

@Component({
  selector: 'app-biz-customertax',
  templateUrl: './customertax.component.html',
  styleUrls: ['./customertax.component.css']
})
export class CustomertaxComponent implements OnInit {

  @Input() customerProfileModle: BehaviorSubject<CustomerProfileModle>;

  constructor(private  dialogx: DialogservicesService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  addtax(height: string, width: string) {
    const dialogRef = this.dialog.open(CustomertaxaddComponent, {
      height: height,
      width: width,
      disableClose: false,
      data: this.customerProfileModle.getValue()
    });

    dialogRef.afterClosed().subscribe(result => {

    });

  }
}
