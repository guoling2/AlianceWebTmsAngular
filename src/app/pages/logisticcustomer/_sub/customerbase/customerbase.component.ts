import {Component, Input, OnInit, Output} from '@angular/core';
import {IDataActionMethod} from '../../idata-action-method';
import {EmplayeeUser} from '../../../../models/User/emplayee';
import {CustomerProfileModle} from '../../../../models/customers/customer-profile-modle';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogservicesService} from '../../../../help/dialogservices.service';
import {EmitService} from '../../../../help/emit-service';
import {CustomerProfileServiceService} from '../../../../services/customers/customer-profile-service.service';
import {LogisticStoreAuthorizeServiceService} from '../../../../services/logisticstore/logistic-store-authorize-service.service';
import {LogisticStore} from '../../../../models/LogisticStore/logistic-store';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';
import {Formextension} from '../../../../help/formextension';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-biz-customerbase',
  templateUrl: './customerbase.component.html',
  styleUrls: ['./customerbase.component.css']
})
export class CustomerbaseComponent implements OnInit, IDataActionMethod {

  constructor( private fb: FormBuilder,
               private  dialogx: DialogservicesService,
               private router: Router,
               private emitService: EmitService,
               private customerProfileServiceService: CustomerProfileServiceService,
               private logisticStoreAuthorizeServiceService: LogisticStoreAuthorizeServiceService) { }

  @Input() customerProfileModle: BehaviorSubject<CustomerProfileModle>;
  public form: FormGroup;

  public formSumitAttempt: boolean;

  logistticstores: LogisticStore[];

  ngOnInit() {
    this.logisticStoreAuthorizeServiceService.MyStores().subscribe( (value: LogisticStore[]) => {

      this.logistticstores = value;

    });


    this.customerProfileModle.subscribe({
      next: (x) => {
        this.form = this.fb.group({
          name: [ x.Name, Validators.required] ,
          code: x.Code,
          simplename: x.Simplename,
          customType:  [x.CustomType, Validators.required],
          customleavel: [x.Customleavel, Validators.required],
          emp: x.Emp, // 业务
          partyto: [ x.Partyto, Validators.required], // 从属 机构
          enabel: [x.Enabel.toString()],
          createuser: x.Createuser,
          Canmonthlysettle: x.Canmonthlysettle,
          Ismonth: x.Ismonth
        });
      }
    });
  }

  @Output()
  Save(paramter: any): void {

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

            if (this.customerProfileModle.getValue().CustomerId.length > 0) {
              this.customerProfileServiceService.Update(
                this.customerProfileModle.getValue().CustomerId,
                <CustomerProfileModle>this.form.getRawValue()).subscribe(a => {
                this.emitService.eventEmit.emit(
                  new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
              });
            } else {
              // this.customerProfileServiceService.Insert(<CustomerProfileModle>this.form.getRawValue()).subscribe(a => {
              //   this.emitService.eventEmit.emit(
              //     new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
              //   if ( a.StatusCode === TmsresponseStatusCode.Succeed() ) {
              //
              //     if (paramter === 1) {
              //       this.router.navigate(['biz/customer-management/edit', a.Data]);
              //     }
              //     //  biz/customer-management/edit/BC100004000005
              //
              //    // this.form.reset();
              //   }
              //
              //   console.log(a);
              // });
            }

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
