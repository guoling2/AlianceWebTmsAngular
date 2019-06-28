import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AlertMessageType, EmitAlertMessage} from '../../help/emit-alert-message';
import {addMonths} from '../../component/date-picker/dateUtils';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import {MessageComponent} from '../../component/message';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {



  @ViewChild('message')
  public messagec: MessageComponent;

  public display = false;

  // 主标题
  alertlabel: string;
  // 附标题
  alertsublabel: string;
  // 颜色  primary light-green warn
  alertcolor: string;
  // 图标   info check_circle  warning
  alerticon: string;

  constructor() {


  }

  ngOnInit() {

  }
  private  autoclose() {

    setTimeout(() => {
      this.cclose();
    }, 10000);
  }
  public show(alertmessage: EmitAlertMessage) {
    this.display = true;

    switch (alertmessage.MessageType) {

      case AlertMessageType.Succeed:

        this.alertcolor = 'light-green';
        this.alerticon = 'check_circle';
        break;
      case AlertMessageType.Error:

        this.alertcolor = 'warn';
        this.alerticon = 'warning';
        break;

      case AlertMessageType.Info:
      default:
        this.alertcolor = 'primary';
        this.alerticon = 'info';
        break;
    }

    this.alertlabel = alertmessage.Title;
    this.alertsublabel = alertmessage.Message;

    this.autoclose();
    //alert(this.alertcolor + '颜色');

  }
  public cclose() {

    this.alertlabel = null;
    this.messagec.close();


  }
}
