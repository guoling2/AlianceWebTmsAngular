import {Component, Input, OnInit} from '@angular/core';
import {OrderAbnormalPaymentModel} from '../../../../../../models/badorder/order-abnormal-payment-model';
import {OrderAbnormalProcessResultModel} from '../../../../../../models/badorder/order-abnormal-process-result-model';
import {OrderAbnormalProcessResultService} from '../../../../../../services/orderabnormal/order-abnormal-process-result.service';
import {ActivatedRoute} from '@angular/router';
import {EmitService} from '../../../../../../help/emit-service';
import {TmsresponseStatusCode} from '../../../../../../models/tms-response.module';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../../../help/emit-alert-message';
import {OrderAbnormalProcessResultRequest} from '../../../../../../models/badorder/order-abnormal-process-result-request';

@Component({
  selector: 'app-order-abnormal-process-result',
  templateUrl: './order-abnormal-process-result.component.html',
  styleUrls: ['./order-abnormal-process-result.component.css']
})
export class OrderAbnormalProcessResultComponent implements OnInit {

  @Input()
  MessageId: string;

  public orderAbnormalProcessResultModel: OrderAbnormalProcessResultModel;

  public allowmotifu: boolean;

  constructor(
    private route: ActivatedRoute,
    private emitService: EmitService,
    private orderAbnormalProcessResultService: OrderAbnormalProcessResultService) {

    this.orderAbnormalProcessResultModel = new OrderAbnormalProcessResultModel();
  }

  ngOnInit() {
    this.route.params.subscribe((params: {id: string}) => {

      this.MessageId = this.route.snapshot.paramMap.get('id');
      this.reloaddetail();
    });

  }
  reloaddetail() {
    this.orderAbnormalProcessResultService.detail(this.MessageId).subscribe((a) => {
      this.orderAbnormalProcessResultModel = a;
      this.orderAbnormalProcessResultModel.MessageId = this.MessageId;
    });
  }
  finishtask () {


    if (this.orderAbnormalProcessResultModel.AbResult === null) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请填写处理结果', MessageShowType.Toast));
    }
    const request = new OrderAbnormalProcessResultRequest();
    request.AbCustomerIdea = this.orderAbnormalProcessResultModel.AbCustomerIdea;
    request.AbIdea = this.orderAbnormalProcessResultModel.AbIdea;
    request.AbResult = this.orderAbnormalProcessResultModel.AbResult;
    request.MessageId = this.orderAbnormalProcessResultModel.MessageId;
    request.UptoChangeIdea = this.orderAbnormalProcessResultModel.UptoChangeIdea;


    this.orderAbnormalProcessResultService.add(request).subscribe((a) => {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
      if (a.StatusCode === TmsresponseStatusCode.Succeed()) {
        this.reloaddetail();
      }
    });

  }
}
