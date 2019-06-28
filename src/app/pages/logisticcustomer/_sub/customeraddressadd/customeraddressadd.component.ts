import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CustomerProfileModle} from '../../../../models/customers/customer-profile-modle';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Formextension} from '../../../../help/formextension';
import {CustomerAddressModle} from '../../../../models/customers/customer-address-modle';
import {CustomerAddressServiceService} from '../../../../services/customers/customer-address-service.service';
import {EmitService} from '../../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';

@Component({
  selector: 'app-biz-customeraddressadd',
  templateUrl: './customeraddressadd.component.html',
  styleUrls: ['./customeraddressadd.component.css']
})
export class CustomeraddressaddComponent implements OnInit {

  public form: FormGroup;

  constructor( private emitService: EmitService, private customerAddressServiceService: CustomerAddressServiceService , private fb: FormBuilder, public dialogRef: MatDialogRef<CustomeraddressaddComponent>,
               @Inject(MAT_DIALOG_DATA) public datasource: CustomerProfileModle) { }

  ngOnInit() {
    this.form = this.fb.group({
      CustomerId: [this.datasource.CustomerId, Validators.required] ,
      LinkMan: [ '', Validators.required],
      LinkAddress: '',
      LinkTel: '',
      LinkPhone: '',
      Area: [ '', Validators.required]
    });
    console.log(this.datasource);
  }

  saveaction() {
    if (this.form.valid) {
      this.customerAddressServiceService.Insert(<CustomerAddressModle>this.form.getRawValue())
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
