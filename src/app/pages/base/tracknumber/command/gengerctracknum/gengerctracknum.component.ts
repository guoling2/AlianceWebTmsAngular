import { Component, OnInit } from '@angular/core';
import {Companyservice} from '../../../../../services/profile/companyservice';
import {LogisticStore} from '../../../../../models/LogisticStore/logistic-store';
import {OrganizationInfominationModel} from '../../../../../models/base/organizationInfominationModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CTracknumberservice} from '../../../../../services/trackordernumber/ctracknumberservice';
import {ShipmentSaveOrder} from '../../../../../models/shipment/shipment-save-order';
import {TmsResponseModle} from '../../../../../models/tms-response.module';
import {MatDialogRef} from '@angular/material';
import {EmitService} from '../../../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage} from '../../../../../help/emit-alert-message';

@Component({
  selector: 'app-gengerctracknum',
  templateUrl: './gengerctracknum.component.html',
  styleUrls: ['./gengerctracknum.component.css']
})
export class GengerctracknumComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GengerctracknumComponent>, private cTracknumberservice: CTracknumberservice, private  companyservice: Companyservice, private fb: FormBuilder, ) {


  }

  /**
   * 网点的验证
   */
  get tocompanycheck() { return this.acceptforms.get('tocompanycode'); }


  public logisticstorefiled: Object = { text: 'OrganName', value: 'OrganCode' };

  logistticstores: OrganizationInfominationModel[]|any;

  acceptforms: FormGroup;

  /**
   * 申请物流单号
   */
  public ErrorMsg: string;

  ngOnInit() {

    this.acceptforms = this.fb.group({
      tocompanycode: ['', Validators.required],
      numbercount: [1]
    });

    this.companyservice.MyCompany().subscribe( (value: OrganizationInfominationModel[]) => {
      this.logistticstores = value; });

  }

  applay($event): void {

    if (this.acceptforms.valid === false) {
      return;
    }

    const formvalues = this.acceptforms.getRawValue();


    console.log(formvalues);

    this.cTracknumberservice.Apply(formvalues).subscribe(
      ( value: TmsResponseModle ) => {
        if ( value.StatusCode !== 200 ) {

          this.ErrorMsg = value.Info;
        } else {

          this.dialogRef.close(value);
        }
        console.log(value);

      }, ( xerror: any ) => {
        alert(xerror);
      });

  }

}
