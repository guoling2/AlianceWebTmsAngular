import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogisticstoreService} from '../../../../services/base/logisticstore.service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';
import {EmitService} from '../../../../help/emit-service';
import {DialogservicesService} from '../../../../help/dialogservices.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  saveform: FormGroup;
  private issave: boolean; // 正在保存数据
  constructor(private  dialogx: DialogservicesService, public emitService: EmitService, private fb: FormBuilder, public logisticstoreService: LogisticstoreService) { }

  ngOnInit() {

    this.saveform = this.fb.group({
      StoreName: ['', Validators.required ],
      LinkMan: ['', Validators.required ],
      LinkTel: ['', Validators.required ],
      StoreArea: ['', Validators.required ],
      StoreAddessDetail: ['', Validators.required ],
      OwnCompanyName: ['', Validators.required ],
      CreateUserDate: ['', Validators.required ],
      StoreOwnUserId: ['', Validators.required ],
      IsEnable: ['', Validators.required ],
      OwnCompanyId: ['', Validators.required ],
      StoreTypeId: ['', Validators.required ],
      BranchLevel: ['', Validators.required ],
      IsManageBranch: [false, Validators.required ],
      Lng: [''],
      Lat: [''],
      BuinessContent: [''],
      GoodsSendAreaMsg: [''],
      TihuoMoneyMsg: [''],
      SonghuoMoneyMsg: [''],
      Desc: [''],
      BuinessTimeMsg: ['']
    });
  }
  /**
   * 验证
   */
  get StoreNamedcheck() { return this.saveform.get('StoreName'); }
  get LinkMancheck() { return this.saveform.get('LinkMan'); }
  get LinkTelcheck() { return this.saveform.get('LinkTel'); }
  get StoreTypeIdcheck() { return this.saveform.get('StoreTypeId'); }
  get BranchLevelcheck() { return this.saveform.get('BranchLevel'); }
  get IsManageBranchcheck() { return this.saveform.get('IsManageBranch'); }
  get StoreAreacheck() { return this.saveform.get('StoreArea'); }
  get StoreAddessDetailcheck() { return this.saveform.get('StoreAddessDetail'); }



  saveforms () {

    // if (this.saveform.valid === false) {
    //   return;
    // }


    const alerter = {
      Title: '确认',
      Message: '是否创建',
      ConfirmModel: true,
      Callback: ((result: boolean) => {
        if (result === false) {
          return;
        }
        if (this.issave === true) {

          this.emitService.eventEmit.emit(
            new EmitAlertMessage(AlertMessageType.Info, '系统信息', '数据正在保存。。'));
          return;
        }


        try {

          console.log(this.saveform.value);
          this.logisticstoreService.Insert(this.saveform.value).subscribe((a) => {

            if ( a.StatusCode === TmsresponseStatusCode.Succeed() ) {
              this.emitService.eventEmit.emit(
                new EmitAlertMessage(AlertMessageType.Succeed, '系统信息', a.Info, MessageShowType.Toast));
               this.saveform.reset();
             } else {
              this.emitService.eventEmit.emit(
                new EmitAlertMessage(AlertMessageType.Error, '系统信息', a.Info, MessageShowType.Toast));
            }
           });
        } finally {
          this.issave = false;
        }

      })};
    this.dialogx.openDialog(alerter);


  }
}
