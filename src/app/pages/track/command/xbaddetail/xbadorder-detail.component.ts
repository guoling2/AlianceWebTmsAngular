import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DialogservicesService} from '../../../../help/dialogservices.service';
import {TaskProcessCommands, TaskProcessRequest} from '../../../../models/badorder/task-process-request';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../help/emit-alert-message';
import {OrderAbnormalServiceService} from '../../../../services/orderabnormal/order-abnormal-service.service';
import {OrderHasExceptionViewModel} from '../../../../models/badorder/OrderHasExceptionViewModel';
import {OrderAbnormalMessageViewModel} from '../../../../models/badorder/OrderAbnormalMessageViewModel';
import {EmitService} from '../../../../help/emit-service';
import {TmsresponseStatusCode} from '../../../../models/tms-response.module';
@Component({
  selector: 'app-xbadorder-detail',
  templateUrl: './xbadorder-detail.component.html',
  styleUrls: ['./xbadorder-detail.component.css']
})
export class XbadorderDetailComponent implements OnInit {

  constructor(private  dialogx: DialogservicesService,
              public emitService: EmitService,
              private orderAbnormalServiceService: OrderAbnormalServiceService,
              private route: ActivatedRoute) {

  }
 @Output()
  OrderAbnormalMessageViewModel: OrderAbnormalMessageViewModel;

  @Input()
  public quectioncliamreadonly: boolean;

  @Input()
  public showdocument: boolean;
  private  issave: boolean;
  public  btnstatued = false;

  ngOnInit() {
    this.OrderAbnormalMessageViewModel = new OrderAbnormalMessageViewModel();
    this.OrderAbnormalMessageViewModel.HasExceptionOrderViewModel = new OrderHasExceptionViewModel();
    this.OrderAbnormalMessageViewModel.HappendTime =  new Date ();



    this.route.params.subscribe((params: {id: string}) => {

      const id = this.route.snapshot.paramMap.get('id');

      this.orderAbnormalServiceService.Detail(id).subscribe(result => {
        console.log(result);
        this.OrderAbnormalMessageViewModel = result;
      });

    });



  }
  MotifyQuestionCliam () {
    this.issave = true;
    const alerter = {
      Title: '确认',
      Message: '确认修改分类吗？',
      ConfirmModel: true,
      Callback: ((result: boolean) => {

        if ( !result ) {
          return;
        }
        try {
          const MessageId = this.OrderAbnormalMessageViewModel.MessageId;
          const QuestionCliam = this.OrderAbnormalMessageViewModel.QuestionCliam;
          this.orderAbnormalServiceService.Motifyclaim(MessageId, QuestionCliam).subscribe(a => {
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
