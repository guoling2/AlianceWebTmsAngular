import {Component, OnInit, ViewChild} from '@angular/core';

import {OrderAbnormalServiceService} from '../../../services/orderabnormal/order-abnormal-service.service';
import {OrderAbnormalMessageViewModel} from '../../../models/badorder/OrderAbnormalMessageViewModel';
import {ActivatedRoute} from '@angular/router';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../help/emit-alert-message';
import {TmsresponseStatusCode} from '../../../models/tms-response.module';
import {TaskProcessCommands, TaskProcessRequest} from '../../../models/badorder/task-process-request';
import {EmitService} from '../../../help/emit-service';
import {ButtonComponent} from '@syncfusion/ej2-angular-buttons';
import {DialogservicesService} from '../../../help/dialogservices.service';
import {OrderHasExceptionViewModel} from '../../../models/badorder/OrderHasExceptionViewModel';
import {XbadorderDetailComponent} from '../command/xbaddetail/xbadorder-detail.component';

@Component({
  selector: 'app-badorder-detail',
  templateUrl: './badorder-detail.component.html',
  styleUrls: ['./badorder-detail.component.css']
})
export class BadorderDetailComponent implements OnInit {

  constructor(private  dialogx: DialogservicesService,
              public emitService: EmitService,
              private orderAbnormalServiceService: OrderAbnormalServiceService,
              private route: ActivatedRoute) {

  }

  private  issave: boolean;
  public  btnstatued = false;
  @ViewChild('xbadorder', {static: false})
  xbadorder: XbadorderDetailComponent;
  ngOnInit() {

  }
  ProcessOrder () {

    console.log('接单处理');
    console.log( this.xbadorder.OrderAbnormalMessageViewModel);
    this.issave = true;
    const alerter = {
      Title: '确认',
      Message: '确认接单处理吗？',
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if ( !result ) {
          return;
        }
        try {



          const  request = new TaskProcessRequest();
          request.MessageId = this.xbadorder.OrderAbnormalMessageViewModel.MessageId;
          request.Command = TaskProcessCommands.Message_ACCEPT();
          this.orderAbnormalServiceService.Process(request).subscribe(a => {
            this.emitService.eventEmit.emit(
              new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
            if ( a.StatusCode !== TmsresponseStatusCode.Succeed() ) {
            } else {
              this.btnstatued = true;
            }
            console.log(a);
          });
        } finally {
          this.issave = false;
        }

      })};
    this.dialogx.openDialog(alerter);
  }
}
