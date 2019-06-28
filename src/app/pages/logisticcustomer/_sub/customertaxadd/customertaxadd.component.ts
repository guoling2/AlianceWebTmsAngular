import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmitService} from '../../../../help/emit-service';
import {CustomerAddressServiceService} from '../../../../services/customers/customer-address-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CustomerProfileModle} from '../../../../models/customers/customer-profile-modle';
import {CustomerTaxServiceService} from '../../../../services/customers/customer-tax-service.service';
import {CustomerAddressModle} from '../../../../models/customers/customer-address-modle';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';
import {Formextension} from '../../../../help/formextension';
import {CustomerTaxModle} from '../../../../models/customers/customer-tax-modle';

@Component({
  selector: 'app-customertaxadd',
  templateUrl: './customertaxadd.component.html',
  styleUrls: ['./customertaxadd.component.css']
})
export class CustomertaxaddComponent implements OnInit {


  public form: FormGroup;

  constructor(private customerTaxServiceService: CustomerTaxServiceService, private emitService: EmitService, private fb: FormBuilder, public dialogRef: MatDialogRef<CustomertaxaddComponent>,
              @Inject(MAT_DIALOG_DATA) public datasource: CustomerProfileModle) { }

  ngOnInit() {
    this.form = this.fb.group({
      CustomerId: [this.datasource.CustomerId, Validators.required] ,
      Invoicetype: [ '', Validators.required],
      Invoicetitle: [ '', Validators.required],
      Taxno: [ '', Validators.required],
      Bankname: '',
      Bankaccountno: ''
    });
  }

  saveaction() {
    if (this.form.valid) {
      this.customerTaxServiceService.Insert(this.datasource.CustomerId, <CustomerTaxModle>this.form.getRawValue())
        .subscribe((a) => {

          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
          if ( a.StatusCode === TmsresponseStatusCode.Succeed() ) {

            this.dialogRef.close();
          }

        });

    } else {
      Formextension.validateAllFormFields(this.form);
    }
  }
}
