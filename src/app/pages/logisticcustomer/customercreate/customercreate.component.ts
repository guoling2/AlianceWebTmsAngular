import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogisticStore} from '../../../models/LogisticStore/logistic-store';
import {LogisticStoreAuthorizeServiceService} from '../../../services/logisticstore/logistic-store-authorize-service.service';
import {CustomerProfileServiceService} from '../../../services/customers/customer-profile-service.service';
import {Formextension} from '../../../help/formextension';
import {CustomerProfileModle} from '../../../models/customers/customer-profile-modle';
import {DialogservicesService} from '../../../help/dialogservices.service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';
import {EmitService} from '../../../help/emit-service';
import {CustomerbaseComponent} from '../_sub/customerbase/customerbase.component';
import {IDataActionMethod} from '../idata-action-method';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {CustomerAddrequestModle} from '../../../models/customers/customer-addrequest-modle';

@Component({
  selector: 'app-biz-customercreate',
  templateUrl: './customercreate.component.html',
  styleUrls: ['./customercreate.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomercreateComponent implements OnInit {

  logistticstores: LogisticStore[];

  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private  dialogx: DialogservicesService,
    private router: Router,
    private emitService: EmitService,
    private customerProfileServiceService: CustomerProfileServiceService,
    private logisticStoreAuthorizeServiceService: LogisticStoreAuthorizeServiceService) { }

  ngOnInit() {
    this.logisticStoreAuthorizeServiceService.MyStores().subscribe( (value: LogisticStore[]) => {

      this.logistticstores = value;

    });

    this.form = this.fb.group({
      name: [ '', Validators.required] ,
      code: '',
      simplename: '',
      customType:  ['', Validators.required],
      customleavel: ['', Validators.required],
      emp: '', // 业务
      partyto: ['', Validators.required], // 从属 机构
      enabel: [true.toString()],
      Canmonthlysettle: false,
      Ismonth: false,
      CustomerAddressModel: this.fb.group({
        LinkMan: '',
        LinkAddress:  '',
        LinkTel: [ '', Validators.required],
        Area: [ '', Validators.required]
      })
    });
  }

  saveaction() {

    if (this.form.valid) {


      const alerter = {
        Title: '确认',
        Message: '是否保存数据',
        ConfirmModel: true,
        Callback: ((result: boolean) => {

          if ( !result ) {
            return;
          }
          try {

            this.customerProfileServiceService.Insert(<CustomerAddrequestModle>this.form.getRawValue()).subscribe(a => {
              this.emitService.eventEmit.emit(
                new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
              if ( a.StatusCode === TmsresponseStatusCode.Succeed() ) {

                this.router.navigate(['biz/customer-management/edit', a.Data]);
                //  biz/customer-management/edit/BC100004000005

                this.form.reset();
              }

              console.log(a);
            });

          } finally {
            //  this.issave = false;
          }

        })};
      this.dialogx.openDialog(alerter);

    } else {
      Formextension.validateAllFormFields(this.form);
    }



  }
}
