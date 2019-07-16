import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {OrderAbnormalProcessService} from '../../../../../../services/orderabnormal/order-abnormal-process.service';
import {OrderAbnormalProcessRequest} from '../../../../../../models/badorder/order-abnormal-process-request';
import {EmitService} from '../../../../../../help/emit-service';
import {AlertMessageType, EmitAlertMessage, MessageShowType} from '../../../../../../help/emit-alert-message';
import {OrderAbnormalProcessRecordModel} from '../../../../../../models/badorder/order-abnormal-process-record';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-abnormal-process',
  templateUrl: './order-abnormal-process.component.html',
  styleUrls: ['./order-abnormal-process.component.css']
})
export class OrderAbnormalProcessComponent implements OnInit {

  @Input()
  MessageId: string;

  public FlowContent: string;
  public  recordlist: Array<OrderAbnormalProcessRecordModel> = [];
  constructor(private route: ActivatedRoute, private orderAbnormalProcessService: OrderAbnormalProcessService, public emitService: EmitService) { }

  ngOnInit() {

    this.route.params.subscribe((params: {id: string}) => {

      this.MessageId = this.route.snapshot.paramMap.get('id');
      this.loadrecords();
    });


  }
  private  loadrecords() {
    this.orderAbnormalProcessService.recordlist(this.MessageId).subscribe(a => {
      this.recordlist = a;
    });
  }
  /**
   * 添加赔付记录
   * @param statuedid 0 跟进 1结案
   */
  processtask ( statuedid: number ) {

    if (this.FlowContent === undefined ) {
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Error, '系统信息', '请填入跟踪内容', MessageShowType.Toast));
    }
    const  x = new OrderAbnormalProcessRequest();
    x.MessageId = this.MessageId;
    x.FlowContent = this.FlowContent;
    this.orderAbnormalProcessService.add(x).subscribe((a) => {
      this.FlowContent = '';
      this.emitService.eventEmit.emit(
        new EmitAlertMessage(AlertMessageType.Info, '系统信息', a.Info, MessageShowType.Toast));
      this.loadrecords();
    });
  }
}
