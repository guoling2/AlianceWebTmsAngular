import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CustomerProfileModle} from '../../../../models/customers/customer-profile-modle';
import {DialogservicesService} from '../../../../help/dialogservices.service';
import {MatDialog} from '@angular/material';
import {CustomeraddressaddComponent} from '../customeraddressadd/customeraddressadd.component';
import {CustomertaxaddComponent} from '../customertaxadd/customertaxadd.component';
import {CustomerAddressModle} from '../../../../models/customers/customer-address-modle';
import {CustomerTaxModle} from '../../../../models/customers/customer-tax-modle';
import {CustomerTaxServiceService} from '../../../../services/customers/customer-tax-service.service';

@Component({
  selector: 'app-biz-customertax',
  templateUrl: './customertax.component.html',
  styleUrls: ['./customertax.component.css']
})
export class CustomertaxComponent implements OnInit {

  @Input() customerProfileModle: BehaviorSubject<CustomerProfileModle>;

  datasource: CustomerTaxModle[] = [];

  displayedColumns = ['Invoicetitle', 'Taxno', 'Invoicetype',  'Bankname', 'Bankaccountno', 'Action'];

  constructor(private customerTaxServiceService: CustomerTaxServiceService, private  dialogx: DialogservicesService, private dialog: MatDialog) { }

  ngOnInit() {
    this.customerProfileModle.subscribe((a) => {

      if (a.Companycode.length > 0) {

        this.loaddata(a.CustomerId);
      }

    });
  }
  private  loaddata( CustomerId: string): void {
    this.customerTaxServiceService.Search(CustomerId).subscribe((b) => {
      this.datasource = b;
    });
  }

  addtax(height: string, width: string) {
    const dialogRef = this.dialog.open(CustomertaxaddComponent, {
      height: height,
      width: width,
      disableClose: false,
      data: this.customerProfileModle.getValue()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loaddata(this.customerProfileModle.getValue().CustomerId);
    });

  }

  deletetax(taxid: number, title: string) {
    const alerter = {
      Title: '警告',
      Message: title + '是否删除?',
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if (!result) {
          return;
        }

        this.customerTaxServiceService.Delete(
          this.customerProfileModle.getValue().CustomerId,
          taxid).subscribe(a => {
          this.loaddata(this.customerProfileModle.getValue().CustomerId);
        });
      })};

    this.dialogx.openDialog(alerter);
  }
}
