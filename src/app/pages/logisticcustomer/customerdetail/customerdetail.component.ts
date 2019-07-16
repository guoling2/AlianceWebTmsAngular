import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerProfileServiceService} from '../../../services/customers/customer-profile-service.service';
import {CustomerProfileModle} from '../../../models/customers/customer-profile-modle';
import {BehaviorSubject} from 'rxjs';
import {LogisticStore} from '../../../models/LogisticStore/logistic-store';
import {IDataActionMethod} from '../idata-action-method';
import {DialogservicesService} from '../../../help/dialogservices.service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';
import {EmitService} from '../../../help/emit-service';

@Component({
  selector: 'app-biz-customerdetail',
  templateUrl: './customerdetail.component.html',
  styleUrls: ['./customerdetail.component.css']
})
export class CustomerdetailComponent implements OnInit {
  constructor(private emitService: EmitService, private router: Router, private  dialogx: DialogservicesService, private route: ActivatedRoute, private customerProfileServiceService: CustomerProfileServiceService) { }

  public customerProfileModle = new BehaviorSubject<CustomerProfileModle>({
    Canmonthlysettle: false, Ismonth: false,
    Code: '',
    Companycode: '',
    Createdatetime: '',
    Createuser: '',
    CustomType: '',
    CustomerId: '',
    Customleavel: '',
    Emp: '',
    Enabel: true,
    Name: '',
    Partyto: '',
    SendOrderCount: 0,
    Simplename: ''
  });

  @ViewChild('basecom', {static: false})

  basecom: IDataActionMethod;
  private savecommand = 0; // 命令状态

  disenabelbtn = false;

  ngOnInit() {

    const cid = this.route.snapshot.paramMap.get('id');

    this.customerProfileServiceService.Detail(cid).subscribe((a) => {

      this.customerProfileModle.next(a);
    });
  }

  saveaction() {

    switch (this.savecommand) {
      case 0:
        this.basecom.Save(null);
        break;
    }

  }

  del() {

    const alerter = {
      Title: '警告',
      Message: '是否删除？',
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if ( !result ) {
          return;
        }

        this.customerProfileServiceService.Delete(this.customerProfileModle.value.CustomerId).subscribe((a) => {
          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
          this.router.navigate(['biz/customer-management/customers']);
        });

      })};
    this.dialogx.openDialog(alerter);
  }
  changindex($event: number) {

    if ($event !== 0) {

      this.disenabelbtn = true;
    } else {
      this.disenabelbtn = false;
    }
    this.savecommand = $event;
  }
}
