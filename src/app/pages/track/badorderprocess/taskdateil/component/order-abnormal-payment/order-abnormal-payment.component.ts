import {Component, Input, OnInit} from '@angular/core';
import {OrderAbnormalPaymentModel} from '../../../../../../models/badorder/order-abnormal-payment-model';
import {OrderAbnormalPaymentService} from '../../../../../../services/orderabnormal/order-abnormal-payment.service';
import {TmsresponseStatusCode} from '../../../../../../models/tms-response.module';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../../../help/emit-alert-message';
import {EmitService} from '../../../../../../help/emit-service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-abnormal-payment',
  templateUrl: './order-abnormal-payment.component.html',
  styleUrls: ['./order-abnormal-payment.component.css']
})
export class OrderAbnormalPaymentComponent implements OnInit {

  @Input()
  MessageId: string;
  public orderAbnormalPaymentModel: OrderAbnormalPaymentModel;

  public allowmotifu: boolean;

  constructor(
    private route: ActivatedRoute,
    private orderAbnormalPaymentService: OrderAbnormalPaymentService,
    private emitService: EmitService) { }

  ngOnInit() {
    this.orderAbnormalPaymentModel = new OrderAbnormalPaymentModel();
    this.route.params.subscribe((params: {id: string}) => {

      this.MessageId = this.route.snapshot.paramMap.get('id');
      this.reloaddetail();
    });


  }

  reloaddetail() {
    this.orderAbnormalPaymentService.detail(this.MessageId).subscribe((a) => {
       this.orderAbnormalPaymentModel = a;
       this.orderAbnormalPaymentModel.MessageId = this.MessageId;

       if ( this.orderAbnormalPaymentModel.ProcessStatued === '已交款' ) {
         this.allowmotifu = false;
       }
    });
  }
  processtask () {

    this.orderAbnormalPaymentService.add(this.orderAbnormalPaymentModel).subscribe((a) => {
       if (a.StatusCode === TmsresponseStatusCode.Succeed()) {
         this.reloaddetail();
       } else {
         this.emitService.eventEmit.emit(
           new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
       }
    });
  }

  del () {
    this.orderAbnormalPaymentService.del(this.orderAbnormalPaymentModel.MessageId).subscribe((a) => {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
      if (a.StatusCode === TmsresponseStatusCode.Succeed()) {
        this.reloaddetail();
      }
    });
  }

  comfirmpay () {
    this.orderAbnormalPaymentService.confirmPayDate(this.orderAbnormalPaymentModel.MessageId, new Date()).subscribe((a) => {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
      if (a.StatusCode === TmsresponseStatusCode.Succeed()) {
        this.reloaddetail();
      }
    });
  }
}
