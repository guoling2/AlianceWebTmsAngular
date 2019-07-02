import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {LogisticStore} from '../../../../models/LogisticStore/logistic-store';
import {CustomerProfileModle} from '../../../../models/customers/customer-profile-modle';
import {MatDialog} from '@angular/material';
import {DelegateorderComponent} from '../../../shipment/list/command/delegateorder/delegateorder.component';
import {AlertMessageType, EmitAlertMessage} from '../../../../help/emit-alert-message';
import {CustomeraddressaddComponent} from '../customeraddressadd/customeraddressadd.component';
import {CustomerAddressModle} from '../../../../models/customers/customer-address-modle';
import {CustomerAddressServiceService} from '../../../../services/customers/customer-address-service.service';
import {DialogservicesService} from '../../../../help/dialogservices.service';

@Component({
  selector: 'app-biz-customeraddresslist',
  templateUrl: './customeraddresslist.component.html',
  styleUrls: ['./customeraddresslist.component.css']
})
export class CustomeraddresslistComponent implements OnInit {

  @Input() customerProfileModle: BehaviorSubject<CustomerProfileModle>;
  datasource: CustomerAddressModle[] = [];

  displayedColumns = [ 'AddressId', 'LinkMan', 'LinkTel', 'Provice', 'City', 'Area', 'LinkAddress', 'Action'];

  constructor(private  dialogx: DialogservicesService, private dialog: MatDialog, private customerAddressServiceService: CustomerAddressServiceService) { }

  ngOnInit() {

    this.customerProfileModle.subscribe((a) => {

      if (a.Companycode.length > 0) {

        this.loaddata(a.Companycode, a.CustomerId);
      }

    });
  }

  private  loaddata(Companycode: string, CustomerId: string): void {
    this.customerAddressServiceService.Search(Companycode, CustomerId).subscribe((b) => {
      this.datasource = b;
    });
  }
  addaddress(height: string, width: string) {

    const dialogRef = this.dialog.open(CustomeraddressaddComponent, {
      height: height,
      width: width,
      disableClose: false,
      data: this.customerProfileModle.getValue()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loaddata(
        this.customerProfileModle.getValue().Companycode,
        this.customerProfileModle.getValue().CustomerId);
    });

  }

  deleteAddress(addressId: number) {

    const x = new CustomerAddressModle();

     x.AddressId = addressId;

    const alerter = {
      Title: '警告',
      Message: '是否删除？',
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if ( !result ) {
          return;
        }
        this.customerAddressServiceService.Delete(x).subscribe(a => {
          this.loaddata(
            this.customerProfileModle.getValue().Companycode,
            this.customerProfileModle.getValue().CustomerId);
        });

      })};
    this.dialogx.openDialog(alerter);

  }
}
