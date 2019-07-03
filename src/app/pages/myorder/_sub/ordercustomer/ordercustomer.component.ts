import {Component, Inject, OnInit} from '@angular/core';
import {EmitService} from '../../../../help/emit-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CustomerAddressServiceService} from '../../../../services/customers/customer-address-service.service';
import {OidcSecurityService} from 'angular-auth-oidc-client';
import {CustomerAddressModle} from '../../../../models/customers/customer-address-modle';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {CustomerQueryForOrdermodle} from '../../../../models/customers/customer-for-order-query-modle';


@Component({
  selector: 'app-ordercustomer',
  templateUrl: './ordercustomer.component.html',
  styleUrls: ['./ordercustomer.component.css']
})
export class OrdercustomerComponent implements OnInit {

  public form: FormGroup;
  currentUser = null;
  displayedColumns: string[] = ['CustomerId', 'Name', 'LinkMan', 'LinkTel', 'Canmonthlysettle', 'Area', 'LinkAddress'];

  public displaytithle = '';
  customeraddressdatasource: CustomerQueryForOrdermodle[] = [];

  constructor(

              private oidcSecurityService: OidcSecurityService,
              private customerAddressServiceService: CustomerAddressServiceService,
              private emitService: EmitService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<OrdercustomerComponent>,
              @Inject(MAT_DIALOG_DATA) public customertype: number) { }

  ngOnInit() {


    this.oidcSecurityService.getUserData().subscribe(value => {

      if (this.customertype === 1) {
        this.displaytithle = '发货地址检索';
      } else {
        this.displaytithle = '收货地址检索';
      }

      this.currentUser = value;
      this.form = this.fb.group({
        companyId: [this.currentUser.storecode, Validators.required] ,
        searchtype: [ 'KN', Validators.required],
        searchtxt: [ '', Validators.required]
      });

    });
  }

  search() {

    if (this.form.valid) {
      this.customerAddressServiceService.SearchForCustomer(
        this.form.get('companyId').value,
        this.form.get('searchtype').value,
        this.form.get('searchtxt').value).subscribe((a) => {

          if (a.length === 0) {
            this.emitService.eventEmit.emit(
              new EmitAlertMessage(AlertMessageType.Info, '系统信息', '没有查询到有关' +
                this.form.get('searchtxt').value + '的信息', MessageShowType.Toast));
          }
          this.customeraddressdatasource = a;
      });
    }

  }

  // 选择一个收发货底子
  chosethiscustomer(element: CustomerAddressModle) {

    this.dialogRef.close([this.customertype, element]);

  }
}
